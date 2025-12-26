import { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
import { cn } from "@/lib/utils";

interface ShowcaseProject {
  id: string;
  title: string;
  content: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "nlp-sav-routing",
    title: "NLP Expertise — Fine-Tuning for SAV Routing (AWS SageMaker)",
    content: `# NLP Expertise — Fine-Tuning for SAV Routing (AWS SageMaker)

## Context

I built a text-classification system to route SAV (after-sales service) customer requests to the correct service. The dataset consisted of 10,000+ real user inputs, manually labeled using an in-house annotation platform. Class imbalance was addressed with noise-augmented data and expert-written synthetic examples.

## Approach

- **Model**: \`bert-base-uncased\`, chosen for strong baseline performance and efficient fine-tuning.
- **Training**: SageMaker Training Jobs using a custom Docker image.
- **Evaluation**: Accuracy, precision, and recall; the prioritized metric varied by service (precision for risky intents, recall for high-volume intents).
- **Deployment**: Batch Transform for off-prod evaluation and an Endpoint for real-time inference.
- **Monitoring**: An annotation platform surfaced model predictions, and outlier-prioritization helped focus on abnormal or uncertain cases.
- **Constraints**: Strict privacy requirements; no external SaaS services.

## My Role

Owned model development, training/inference pipelines, evaluation logic, SageMaker integration, Docker containerization, and backend services. Collaborated with a Vue.js engineer who built the front-end annotation UI.

## System Flow (Training + Inference)

\`\`\`mermaid
flowchart LR
    A[User SAV requests] --> B[Annotation Platform]
    B --> C[Curated labeled dataset]
    C --> D[SageMaker Training Job]
    D --> E[Model Artifact]
    E --> F[Batch Transform Evaluation]
    E --> G[SageMaker Endpoint]
    F --> H[Evaluation Dashboard]
    G --> I[Production Routing Service]
\`\`\`

## Continuous Improvement Loop

\`\`\`mermaid
flowchart TB
    A[Annotations] --> B[SageMaker Training Job]
    B --> C[Batch Transform Evaluation]
    C --> D[Observer Mode on Production Data]
    D --> E[Manual Comparison vs Production]
    E -- Not enough --> A
    E -- Sufficient --> F[Promote to Production Endpoint]
\`\`\`

## Outcomes

- Faster iteration on SAV routing models through an automated improvement loop.
- Controlled rollout via observer mode before promotion to real-time inference.
- Reduced annotation effort over time by focusing on outliers and uncertain predictions.`,
  },
];

const ShowcaseSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="showcase" className="py-16 md:py-24 bg-background">
      <div className="container px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Project Showcase
          </h2>
        </div>

        <div className="space-y-4">
          {showcaseProjects.map((project) => (
            <div
              key={project.id}
              className="border border-border/50 rounded-xl overflow-hidden bg-card/30"
            >
              <button
                onClick={() => toggleExpand(project.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
              >
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {project.title}
                </h3>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300",
                    expandedId === project.id && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedId === project.id ? "max-h-[5000px]" : "max-h-0"
                )}
              >
                <div className="px-6 pb-6 pt-2">
                  <MarkdownRenderer content={project.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
