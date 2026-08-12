import { Server, Boxes, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsSection = () => {
  const { t } = useLanguage();

  const blocks = [
    {
      icon: Server,
      title: t({ en: "LLM Serving", fr: "Serving LLM" }),
      items: [
        t({
          en: "Open-source inference engines (vLLM) and multi-model gateways (LiteLLM)",
          fr: "Moteurs d'inférence open-source (vLLM) et gateways multi-modèles (LiteLLM)",
        }),
        t({
          en: "Inference latency and throughput optimization",
          fr: "Optimisation de la latence et du throughput d'inférence",
        }),
        t({
          en: "Routing, fallback, and dynamic model selection",
          fr: "Routage, fallback et sélection de modèle dynamique",
        }),
      ],
    },
    {
      icon: Boxes,
      title: t({ en: "Kubernetes & GPU Infrastructure", fr: "Infrastructure Kubernetes & GPU" }),
      items: [
        t({
          en: "GPU scheduling and partitioning (NVIDIA MIG)",
          fr: "Scheduling et partitionnement GPU (NVIDIA MIG)",
        }),
        t({
          en: "GitOps (ArgoCD, Helm), air-gapped / sovereign deployment",
          fr: "GitOps (ArgoCD, Helm), déploiement en environnement air-gapped / souverain",
        }),
        t({
          en: "Secrets management (SealedSecrets), delivery chain security",
          fr: "Gestion des secrets (SealedSecrets), sécurité de la chaîne de livraison",
        }),
      ],
    },
    {
      icon: Activity,
      title: t({ en: "Observability & Reliability", fr: "Observabilité & fiabilité" }),
      items: [
        t({
          en: "Distributed tracing (OpenTelemetry, W3C TraceContext)",
          fr: "Tracing distribué (OpenTelemetry, W3C TraceContext)",
        }),
        t({
          en: "Grafana / Loki / Tempo / Prometheus stack",
          fr: "Stack Grafana / Loki / Tempo / Prometheus",
        }),
        t({
          en: "Resilient async pipelines (RabbitMQ, FastAPI/aiohttp), chaos engineering",
          fr: "Pipelines asynchrones résilients (RabbitMQ, FastAPI/aiohttp), chaos engineering",
        }),
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container px-6 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          {t({ en: "Skills", fr: "Compétences" })}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="border border-border/50 rounded-xl bg-card/30 p-6"
            >
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                <block.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-4">
                {block.title}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;