import { Rocket, Boxes, ShieldCheck, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatIDoSection = () => {
  const { t } = useLanguage();

  const areas = [
    {
      icon: Rocket,
      title: t({ en: "Putting LLMs into production", fr: "Mise en production de LLM" }),
      description: t({
        en: "From model selection to go-live: serving, integration into existing applications, and progressive rollout.",
        fr: "Du choix du modèle à la mise en service : serving, intégration dans les applications existantes et déploiement progressif.",
      }),
    },
    {
      icon: Boxes,
      title: t({ en: "Kubernetes & GPU infrastructure", fr: "Infrastructure Kubernetes & GPU" }),
      description: t({
        en: "Designing and operating the compute layer that runs the models: clusters, GPU allocation, capacity and cost.",
        fr: "Conception et exploitation de la couche de calcul qui fait tourner les modèles : clusters, allocation GPU, capacité et coût.",
      }),
    },
    {
      icon: ShieldCheck,
      title: t({ en: "Sovereign & air-gapped environments", fr: "Environnements souverains et air-gapped" }),
      description: t({
        en: "Working inside constrained perimeters: no external SaaS, controlled hosting, offline delivery chain.",
        fr: "Intervention dans des périmètres contraints : sans SaaS externe, hébergement maîtrisé, chaîne de livraison hors ligne.",
      }),
    },
    {
      icon: Activity,
      title: t({ en: "Observability & reliability", fr: "Observabilité et fiabilité" }),
      description: t({
        en: "Making inference behaviour visible and predictable: tracing, metrics, alerting, resilience of the pipelines.",
        fr: "Rendre le comportement de l'inférence visible et prévisible : tracing, métriques, alerting, résilience des pipelines.",
      }),
    },
  ];

  return (
    <section id="what-i-do" className="py-12 md:py-16 bg-secondary/10 border-y border-border/40">
      <div className="container px-6 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          {t({ en: "What I do", fr: "Ce que je fais" })}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {areas.map((area) => (
            <div key={area.title} className="flex gap-4">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <area.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
