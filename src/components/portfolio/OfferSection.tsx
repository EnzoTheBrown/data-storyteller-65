import { Gauge, ShieldCheck, Handshake, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CONTACT_EMAIL = "enzo@tantar.ai";

const OfferSection = () => {
  const { t } = useLanguage();

  const offers = [
    {
      icon: Gauge,
      title: t({ en: "GPU audit & optimization", fr: "Audit & optimisation GPU" }),
      description: t({
        en: "Diagnosing GPU utilization on an existing inference platform and delivering an optimization plan (partitioning, scheduling, load-aware routing).",
        fr: "Diagnostic de l'utilisation GPU d'une plateforme d'inférence existante et plan d'optimisation (partitionnement, scheduling, routage conscient de la charge).",
      }),
    },
    {
      icon: ShieldCheck,
      title: t({ en: "On-premise / sovereign LLM deployment", fr: "Déploiement LLM on-premise / souverain" }),
      description: t({
        en: "Building a self-hosted LLM inference platform, from architecture to production rollout, in constrained or air-gapped environments.",
        fr: "Mise en place d'une plateforme d'inférence LLM auto-hébergée, de l'architecture à la mise en production, dans un environnement contraint ou air-gapped.",
      }),
    },
    {
      icon: Handshake,
      title: t({ en: "AI infrastructure subcontracting", fr: "Sous-traitance infrastructure IA" }),
      description: t({
        en: "Reinforcing or fully taking over the operation of a production LLM inference platform (reliability, observability, on-call).",
        fr: "Renfort ou prise en charge complète de l'exploitation d'une plateforme d'inférence LLM en production (fiabilité, observabilité, astreinte).",
      }),
    },
  ];

  return (
    <section id="offer" className="py-16 md:py-24 bg-secondary/10 border-y border-border/40">
      <div className="container px-6 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          {t({ en: "What I offer", fr: "Ce que je propose" })}
        </h2>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {offers.map((offer) => (
            <div key={offer.title} className="border border-border/50 rounded-xl bg-card/30 p-6">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                <offer.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-3">
                {offer.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{offer.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail className="w-5 h-5 mr-2" />
              {CONTACT_EMAIL}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;