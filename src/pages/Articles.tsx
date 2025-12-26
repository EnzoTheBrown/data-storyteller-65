import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, FileText, Loader2, ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/portfolio/MarkdownRenderer";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { GITHUB_API_BASE, GITHUB_RAW_BASE } from "@/lib/github";
import LanguageSwitcher from "@/components/portfolio/LanguageSwitcher";

interface Article {
  name: string;
  slug: string;
}

const useArticleList = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${GITHUB_API_BASE}/articles`);
        if (!response.ok) throw new Error("Failed to fetch article list");
        const data = await response.json();
        
        const langSuffix = `.${language}.md`;
        const mdFiles = data
          .filter((file: any) => file.name.endsWith(langSuffix))
          .map((file: any) => ({
            name: file.name,
            slug: file.name.replace(langSuffix, ""),
          }));
        
        setArticles(mdFiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  return { articles, loading, error };
};

const formatTitle = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const useArticleContent = (slug: string, isExpanded: boolean) => {
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
  }, [slug, language, isExpanded]);

  return { content, loading, error };
};

const ArticleCard = ({ article }: { article: Article }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { content, loading, error } = useArticleContent(article.slug, isExpanded);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
      >
        <h3 className="font-display font-semibold text-foreground text-lg">
          {formatTitle(article.slug)}
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

const Articles = () => {
  const { articles, loading, error } = useArticleList();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container px-6 max-w-5xl mx-auto py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t({ en: "Back to Home", fr: "Retour à l'accueil" })}</span>
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
            {t({ en: "Articles", fr: "Articles" })}
          </h1>
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
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Articles;
