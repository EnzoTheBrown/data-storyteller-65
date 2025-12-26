import { useState, useEffect } from "react";
import { ChevronDown, Layers, Loader2 } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { cn } from "@/lib/utils";

interface ShowcaseProject {
  id: string;
  title: string;
  url: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "nlp-sav-routing",
    title: "NLP Expertise — Fine-Tuning for SAV Routing (AWS SageMaker)",
    url: "https://raw.githubusercontent.com/EnzoTheBrown/me/main/showcases/nlp-expertise.md",
  },
];

const useShowcaseContent = (url: string, isExpanded: boolean) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isExpanded || content) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
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
  }, [url, isExpanded, content]);

  return { content, loading, error };
};

const ShowcaseCard = ({ project }: { project: ShowcaseProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { content, loading, error } = useShowcaseContent(project.url, isExpanded);

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
  return (
    <section id="showcase" className="py-16 md:py-24 bg-background">
      <div className="container px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Project Showcase
          </h2>
        </div>

        <div className="space-y-4">
          {showcaseProjects.map((project) => (
            <ShowcaseCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
