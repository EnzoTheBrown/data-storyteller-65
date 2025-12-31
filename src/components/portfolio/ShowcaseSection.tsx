import { useState, useEffect } from "react";
import { ChevronDown, Layers, Loader2 } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentIndex } from "@/hooks/useContentIndex";
import { getContentUrl, type ContentItem } from "@/lib/s3";

interface ShowcaseProject {
  name: string;
  title: string;
  path: string;
}

const cleanTitle = (title: string): string => {
  // Remove markdown heading prefix (# ) and trim
  return title.replace(/^#\s*/, "").trim();
};

const detectLanguage = (title: string): "en" | "fr" => {
  // Simple heuristic: check for common French characters/words
  const frenchIndicators = /[éèêëàâäùûüôöîïç]|d'un|l'|qu'|système|étude/i;
  return frenchIndicators.test(title) ? "fr" : "en";
};

const useShowcaseList = () => {
  const { language } = useLanguage();
  const { data: index, isLoading, error } = useContentIndex();

  const projects: ShowcaseProject[] = (index?.showcases || [])
    .filter((item: ContentItem) => detectLanguage(item.title) === language)
    .map((item: ContentItem) => ({
      name: item.name,
      title: cleanTitle(item.title),
      path: item.name,
    }));

  return { 
    projects, 
    loading: isLoading, 
    error: error?.message || null 
  };
};

const useShowcaseContent = (path: string, isExpanded: boolean) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isExpanded) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      setContent(null);
      try {
        const url = getContentUrl(path);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch content");
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path, isExpanded]);

  return { content, loading, error };
};

const ShowcaseCard = ({ project }: { project: ShowcaseProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { content, loading, error } = useShowcaseContent(project.path, isExpanded);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
      >
        <h3 className="font-display font-semibold text-foreground text-lg">
          {project.title}
        </h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[5000px]" : "max-h-0"
        )}
      >
        <div className="px-6 pb-6 pt-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}
          {content && <MarkdownRenderer content={content} />}
        </div>
      </div>
    </div>
  );
};

const ShowcaseSection = () => {
  const { projects, loading, error } = useShowcaseList();
  const { t } = useLanguage();

  return (
    <section id="showcase" className="py-16 md:py-24 bg-background">
      <div className="container px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {t({ en: "Project Showcase", fr: "Projets" })}
          </h2>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <p className="text-destructive text-center">{error}</p>
        )}

        <div className="space-y-4">
          {projects.map((project) => (
            <ShowcaseCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
