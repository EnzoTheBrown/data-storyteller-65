import profilePicture from "@/assets/me.png";
import experiencesEn from "@/data/experiences.en.json";
import experiencesFr from "@/data/experiences.fr.json";
import formationsEn from "@/data/formations.en.json";
import formationsFr from "@/data/formations.fr.json";
import type { Language } from "@/contexts/LanguageContext";
import type { Experience, Education } from "@/types/portfolio";

export interface ContentItem {
  name: string;
  title: string;
}

export interface ContentIndex {
  generated_at: string;
  articles: ContentItem[];
  showcases: ContentItem[];
}

// Markdown bundled at build time (no remote fetch)
const markdownModules = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const normalize = (path: string) => `/src/content/${path.replace(/^\/+/, "")}`;

export const getContentBody = (path: string): string | null =>
  markdownModules[normalize(path)] ?? null;

export const contentIndex: ContentIndex = {
  generated_at: "2026-01-04T10:29:11.929929+00:00",
  articles: [
    {
      name: "articles/942499319d174a3f83cf46fd61469a93.md",
      title: "# Observability in a Machine Learning System: I Was Wrong from the Start\n",
    },
    {
      name: "articles/cd125495d5204ecea842b9d2864a2c74.md",
      title: "# Observabilité d’un système de machine learning : j’avais tort depuis le début\n",
    },
  ],
  showcases: [
    {
      name: "showcases/06195f9d21594cf5a4e0257bc0f941a1.md",
      title: "# Case Study - NLP Fine-Tuning for SAV Routing (AWS SageMaker)\n",
    },
    {
      name: "showcases/3b839113578a4415876652505142aa07.md",
      title: "# Étude de cas — Pipeline OCR & Parsing documentaire juridique\n",
    },
    {
      name: "showcases/610ab9480e474695891564c7c5b73f56.md",
      title: "# Étude de cas - Fine-Tuning NLP pour le routage SAV (AWS SageMaker)\n",
    },
    {
      name: "showcases/92597476d0c348adb30d9e18ed47bf10.md",
      title: "# Case Study - Payment Automation Platform (iBanFirst)\n",
    },
    {
      name: "showcases/9befd5aa2bf74e4eb7742ff6444ff07a.md",
      title: "# Étude de cas - Plateforme d’automatisation des paiements (iBanFirst)\n",
    },
    {
      name: "showcases/f3bb57bb888547e091cf1668380a019c.md",
      title: "# Case Study - OCR + Document Parsing Pipeline (Tantar)\n",
    },
  ],
};

export const getExperiences = (lang: Language): Experience[] =>
  (lang === "fr" ? experiencesFr : experiencesEn) as unknown as Experience[];

export const getFormations = (lang: Language): Education[] =>
  (lang === "fr" ? formationsFr : formationsEn) as unknown as Education[];

export const getProfilePictureUrl = () => profilePicture;
