import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Briefcase } from "lucide-react";
import MarkdownRenderer from "@/components/portfolio/MarkdownRenderer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getContentUrl, type ContentItem } from "@/lib/s3";
import { useContentIndex } from "@/hooks/useContentIndex";
import LanguageSwitcher from "@/components/portfolio/LanguageSwitcher";

const cleanTitle = (title: string): string => {
  return title.replace(/^#\s*/, "").trim();
};

const detectLanguage = (title: string): "en" | "fr" => {
  const frenchIndicators = /[éèêëàâäùûüôöîïç]|d'un|l'|qu'|système|étude/i;
  return frenchIndicators.test(title) ? "fr" : "en";
};

const useShowcaseContent = (slug: string | undefined) => {
  const { language } = useLanguage();
  const { data: index } = useContentIndex();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showcaseTitle, setShowcaseTitle] = useState<string>("");

  useEffect(() => {
    if (!slug || !index) return;

    // Find the showcase by matching the UUID in the name
    const showcase = index.showcases.find((item: ContentItem) => {
      const filename = item.name.split("/").pop() || "";
      const itemSlug = filename.replace(".md", "");
      return itemSlug === slug && detectLanguage(item.title) === language;
    });

    if (!showcase) {
      // Try to find in any language as fallback
      const fallbackShowcase = index.showcases.find((item: ContentItem) => {
        const filename = item.name.split("/").pop() || "";
        const itemSlug = filename.replace(".md", "");
        return itemSlug === slug;
      });

      if (!fallbackShowcase) {
        setError("Showcase not found");
        setLoading(false);
        return;
      }

      // Use fallback showcase
      setShowcaseTitle(cleanTitle(fallbackShowcase.title));
      fetchShowcaseContent(fallbackShowcase.name);
      return;
    }

    setShowcaseTitle(cleanTitle(showcase.title));
    fetchShowcaseContent(showcase.name);

    async function fetchShowcaseContent(path: string) {
      setLoading(true);
      setError(null);
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
    }
  }, [slug, language, index]);

  return { content, loading, error, title: showcaseTitle };
};

const ShowcasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content, loading, error, title } = useShowcaseContent(slug);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container px-6 max-w-5xl mx-auto py-4 flex items-center justify-between">
          <Link 
            to="/projects" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t({ en: "Back to Projects", fr: "Retour aux projets" })}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container px-6 max-w-5xl mx-auto py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {title || "Showcase"}
          </h1>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Link 
              to="/projects" 
              className="text-primary hover:underline"
            >
              {t({ en: "Return to projects list", fr: "Retourner à la liste des projets" })}
            </Link>
          </div>
        )}

        {content && (
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownRenderer content={content} />
          </article>
        )}
      </main>
    </div>
  );
};

export default ShowcasePage;
