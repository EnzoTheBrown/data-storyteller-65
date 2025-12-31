import { Link } from "react-router-dom";
import { ChevronDown, FileText, Loader2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentIndex } from "@/hooks/useContentIndex";
import LanguageSwitcher from "@/components/portfolio/LanguageSwitcher";
import { type ContentItem } from "@/lib/s3";

interface Article {
  name: string;
  title: string;
}

const cleanTitle = (title: string): string => {
  return title.replace(/^#\s*/, "").trim();
};

const detectLanguage = (title: string): "en" | "fr" => {
  const frenchIndicators = /[éèêëàâäùûüôöîïç]|d'un|l'|qu'|système|étude/i;
  return frenchIndicators.test(title) ? "fr" : "en";
};

const extractSlugFromName = (name: string): string => {
  // Extract UUID from path like "articles/942499319d174a3f83cf46fd61469a93.md"
  const filename = name.split("/").pop() || "";
  return filename.replace(".md", "");
};

const useArticleList = () => {
  const { language } = useLanguage();
  const { data: index, isLoading, error } = useContentIndex();

  const articles: Article[] = (index?.articles || [])
    .filter((item: ContentItem) => detectLanguage(item.title) === language)
    .map((item: ContentItem) => ({
      name: item.name,
      title: cleanTitle(item.title),
    }));

  return { 
    articles, 
    loading: isLoading, 
    error: error?.message || null 
  };
};

const ArticleCard = ({ article }: { article: Article }) => {
  const slug = extractSlugFromName(article.name);
  
  return (
    <Link 
      to={`/articles/${slug}`}
      className="block border border-border/50 rounded-xl overflow-hidden bg-card/30 hover:bg-secondary/20 transition-colors"
    >
      <div className="px-6 py-5 flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {article.title}
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
            <ArticleCard key={article.name} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Articles;
