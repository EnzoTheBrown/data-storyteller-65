import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 border-border/50 hover:bg-secondary/20"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-medium">{language}</span>
    </Button>
  );
};

export default LanguageSwitcher;
