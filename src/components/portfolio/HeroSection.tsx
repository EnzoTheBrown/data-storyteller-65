import { getProfilePictureUrl } from "@/hooks/usePortfolioData";
import { MapPin, Briefcase, Sparkles, Calendar, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center justify-center gradient-hero overflow-hidden">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Profile Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative w-40 h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-primary/30 glow-primary">
              <img
                src={getProfilePictureUrl()}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-unsplash?w=400&h=400&fit=crop&crop=face";
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-xl">
            <p 
              className="text-primary font-medium tracking-wider uppercase text-xs mb-3 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {t({ en: "LLM Engineer · On-Premise & Sovereign", fr: "Ingénieur LLM · On-premise & souverain" })}
            </p>
            <h1 
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Enzo Lebrun — <span className="text-gradient">{t({ en: "On-Premise LLM Engineer", fr: "Ingénieur LLM on-premise" })}</span>
            </h1>
            <p 
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 animate-fade-in"
              style={{ animationDelay: "0.35s" }}
            >
              {t({
                en: "I deploy and operate large language models in production, on controlled, sovereign infrastructure. I work end to end, from go-live to day-to-day operations, keeping performance, reliability and cost under control.",
                fr: "Je déploie et j'opère des grands modèles de langage en production, sur des infrastructures maîtrisées et souveraines. J'interviens de la mise en service jusqu'à l'exploitation : performance, fiabilité et coût sous contrôle."
              })}
            </p>
            
            <div 
              className="flex flex-wrap justify-center lg:justify-start gap-5 text-sm text-muted-foreground mb-5 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>France</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>Tantar</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button asChild>
                <Link to="/schedule">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t({ en: "Book a meeting", fr: "Prendre rendez-vous" })}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/projects">
                  <Layers className="w-4 h-4 mr-2" />
                  {t({ en: "View projects", fr: "Voir les projets" })}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
