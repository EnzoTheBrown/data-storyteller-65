import { getProfilePictureUrl } from "@/hooks/usePortfolioData";
import { MapPin, Briefcase, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-primary/30 glow-primary">
              <img
                src={getProfilePictureUrl()}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <p 
              className="text-primary font-medium tracking-wider uppercase text-sm mb-4 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Lead Backend & GenAI
            </p>
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Enzo Lebrun
            </h1>
            <p 
              className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/80 mb-6 animate-fade-in"
              style={{ animationDelay: "0.35s" }}
            >
              Data Scientist & <span className="text-gradient">AI Engineer</span>
            </p>
            <p 
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Spécialisé en NLP, MLOps et systèmes distribués. 
              De la conception de modèles de Machine Learning à leur mise en production, 
              je transforme les idées en solutions IA fiables et scalables.
            </p>
            
            <div 
              className="flex flex-wrap justify-center lg:justify-start gap-6 text-muted-foreground mb-6 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>France</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>iBanFirst & Tantar</span>
              </div>
            </div>
            
            <blockquote 
              className="text-muted-foreground/70 italic text-sm md:text-base border-l-2 border-primary/30 pl-4 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              "Build systems you want to debug at 3am." – Charity Majors
            </blockquote>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
