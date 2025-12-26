import { useState, useEffect } from "react";
import { ChevronDown, Layers, Loader2 } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { GITHUB_API_BASE, GITHUB_RAW_BASE } from "@/lib/github";

interface ShowcaseProject {
  name: string;
  slug: string;
}

const useShowcaseList = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${GITHUB_API_BASE}/showcases`);
        if (!response.ok) throw new Error("Failed to fetch project list");
        const data = await response.json();
        
        // Filter files for current language
        const langSuffix = `.${language}.md`;
        const mdFiles = data
          .filter((file: any) => file.name.endsWith(langSuffix))
          .map((file: any) => ({
            name: file.name,
            slug: file.name.replace(langSuffix, ""),
          }));
        
        setProjects(mdFiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  return { projects, loading, error };
};

const formatTitle = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const useShowcaseContent = (slug: string, isExpanded: boolean) => {
  const { language } = useLanguage();
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
        const url = `${GITHUB_RAW_BASE}/showcases/${slug}.${language}.md`;
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
  }, [slug, language, isExpanded]);

  return { content, loading, error };
};

const ShowcaseCard = ({ project }: { project: ShowcaseProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { content, loading, error } = useShowcaseContent(project.slug, isExpanded);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
      >
        <h3 className="font-display font-semibold text-foreground text-lg">
          {formatTitle(project.slug)}
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
            <ShowcaseCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
