import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, FileText } from "lucide-react";
import MarkdownRenderer from "@/components/portfolio/MarkdownRenderer";
import { useLanguage } from "@/contexts/LanguageContext";
import { GITHUB_RAW_BASE } from "@/lib/github";
import LanguageSwitcher from "@/components/portfolio/LanguageSwitcher";

const formatTitle = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const useArticleContent = (slug: string | undefined) => {
  const { language } = useLanguage();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${GITHUB_RAW_BASE}/articles/${slug}.${language}.md`;
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
  }, [slug, language]);

  return { content, loading, error };
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content, loading, error } = useArticleContent(slug);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container px-6 max-w-5xl mx-auto py-4 flex items-center justify-between">
          <Link 
            to="/articles" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t({ en: "Back to Articles", fr: "Retour aux articles" })}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container px-6 max-w-5xl mx-auto py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {slug ? formatTitle(slug) : "Article"}
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
              to="/articles" 
              className="text-primary hover:underline"
            >
              {t({ en: "Return to articles list", fr: "Retourner à la liste des articles" })}
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

export default ArticlePage;
