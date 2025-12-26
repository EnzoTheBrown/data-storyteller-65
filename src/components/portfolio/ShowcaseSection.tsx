import { useState, useEffect } from "react";
import { ChevronDown, Layers, Loader2 } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { cn } from "@/lib/utils";

interface ShowcaseProject {
  name: string;
  download_url: string;
}

const GITHUB_API_URL = "https://api.github.com/repos/EnzoTheBrown/me/contents/showcases";

const useShowcaseList = () => {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error("Failed to fetch project list");
        const data = await response.json();
        const mdFiles = data.filter((file: any) => file.name.endsWith(".md"));
        setProjects(mdFiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

const formatTitle = (filename: string): string => {
  return filename
    .replace(".md", "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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
  const { content, loading, error } = useShowcaseContent(project.download_url, isExpanded);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
      >
        <h3 className="font-display font-semibold text-foreground text-lg">
          {formatTitle(project.name)}
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
