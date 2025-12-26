import type { Language } from "@/contexts/LanguageContext";

export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/EnzoTheBrown/me/main";
export const GITHUB_API_BASE = "https://api.github.com/repos/EnzoTheBrown/me/contents";

export const getGitHubUrl = (path: string, lang: Language) => {
  // Replace file extension with language-specific version
  // e.g., experiences.json -> experiences.en.json
  const parts = path.split(".");
  if (parts.length >= 2) {
    const ext = parts.pop();
    return `${GITHUB_RAW_BASE}/${parts.join(".")}.${lang}.${ext}`;
  }
  return `${GITHUB_RAW_BASE}/${path}`;
};

export const getProfilePictureUrl = () => `${GITHUB_RAW_BASE}/me.png`;
