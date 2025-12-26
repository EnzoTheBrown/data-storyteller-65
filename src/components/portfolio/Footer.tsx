import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LINKEDIN_URL = "https://www.linkedin.com/in/enzolebrun/";
const TWITTER_SHARE_URL = "https://twitter.com/intent/tweet?text=";
const PORTFOLIO_URL = "https://enzolebrun.com";

const Footer = () => {
  const { t } = useLanguage();

  const recommendationText = t({
    en: "I highly recommend Enzo Lebrun as a Data Scientist & AI Engineer. His expertise in NLP, MLOps, and GenAI is exceptional. Check out his portfolio: ",
    fr: "Je recommande vivement Enzo Lebrun en tant que Data Scientist & AI Engineer. Son expertise en NLP, MLOps et GenAI est exceptionnelle. Découvrez son portfolio : "
  });

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container max-w-4xl">
        {/* Recommendation CTAs */}
        <div className="mb-10 text-center">
          <p className="text-muted-foreground mb-4">
            {t({ en: "Enjoyed working with me? Spread the word:", fr: "Vous avez aimé travailler avec moi ? Partagez :" })}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/30"
            >
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                {t({ en: "Recommend on LinkedIn", fr: "Recommander sur LinkedIn" })}
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/20"
            >
              <a
                href={`${TWITTER_SHARE_URL}${encodeURIComponent(recommendationText + PORTFOLIO_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4 mr-2" />
                {t({ en: "Share on X", fr: "Partager sur X" })}
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-foreground">
              Portfolio
            </p>
            <p className="text-sm text-muted-foreground">
              Data Science · {t({ en: "AI", fr: "IA" })} · Backend
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/EnzoTheBrown"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/enzo-lebrun-210aaa112/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:enzo@tantar.ai"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} · {t({ en: "All rights reserved", fr: "Tous droits réservés" })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
