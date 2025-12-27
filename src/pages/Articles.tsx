import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, FileText, Loader2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { GITHUB_API_BASE } from "@/lib/github";
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


const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link 
      to={`/articles/${article.slug}`}
      className="block border border-border/50 rounded-xl overflow-hidden bg-card/30 hover:bg-secondary/20 transition-colors"
    >
      <div className="px-6 py-5 flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {formatTitle(article.slug)}
        </h3>
        <ChevronDown className="w-5 h-5 text-muted-foreground -rotate-90" />
      </div>
    </Link>
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
