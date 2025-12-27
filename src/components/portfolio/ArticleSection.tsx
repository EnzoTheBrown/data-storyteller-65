import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, FileText, Loader2, ArrowRight } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentIndex } from "@/hooks/useContentIndex";
import { getContentUrl } from "@/lib/s3";

interface Article {
  name: string;
  slug: string;
  path: string;
}

const extractSlugFromPath = (path: string, lang: string): string | null => {
  const langSuffix = `.${lang}.md`;
  if (!path.endsWith(langSuffix)) return null;
  const filename = path.split("/").pop() || "";
  return filename.replace(langSuffix, "");
};

const useArticleList = () => {
  const { language } = useLanguage();
  const { data: index, isLoading, error } = useContentIndex();

  const articles: Article[] = (index?.articles || [])
    .map(path => {
      const slug = extractSlugFromPath(path, language);
      if (!slug) return null;
      return { name: path, slug, path };
    })
    .filter((a): a is Article => a !== null);

  return { 
    articles, 
    loading: isLoading, 
    error: error?.message || null 
  };
};

const formatTitle = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const useArticleContent = (path: string, isExpanded: boolean) => {
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

const ArticleCard = ({ article }: { article: Article }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { content, loading, error } = useArticleContent(article.path, isExpanded);

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

const ArticleSection = () => {
  const { articles, loading, error } = useArticleList();
  const { t } = useLanguage();

  return (
    <section id="articles" className="py-16 md:py-24 bg-secondary/10">
      <div className="container px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t({ en: "Articles", fr: "Articles" })}
            </h2>
          </div>
          <Link 
            to="/articles" 
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            {t({ en: "View all", fr: "Voir tout" })}
            <ArrowRight className="w-4 h-4" />
          </Link>
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
      </div>
    </section>
  );
};

export default ArticleSection;
