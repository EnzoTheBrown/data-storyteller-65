import type { Language } from "@/contexts/LanguageContext";

export const S3_BASE_URL = "https://s3.eu-west-1.amazonaws.com/enzolebrun.dev";

export interface ContentItem {
  name: string;
  title: string;
}

export interface ContentIndex {
  generated_at: string;
  articles: ContentItem[];
  showcases: ContentItem[];
}

export const getContentUrl = (path: string) => `${S3_BASE_URL}/${path}`;

export const getLocalizedPath = (basePath: string, lang: Language, ext: string) => {
  // e.g., "articles/my-article" -> "articles/my-article.fr.md"
  return `${basePath}.${lang}.${ext}`;
};

export const getExperiencesUrl = (lang: Language) => 
  `${S3_BASE_URL}/experiences/experiences.${lang}.json`;

export const getFormationsUrl = (lang: Language) => 
  `${S3_BASE_URL}/formations/formations.${lang}.json`;

export const getProfilePictureUrl = () => `${S3_BASE_URL}/me.png`;

export const getIndexUrl = () => `${S3_BASE_URL}/index.json`;
