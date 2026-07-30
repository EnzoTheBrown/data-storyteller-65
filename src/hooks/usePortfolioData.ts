import type { Experience, Education } from "@/types/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { getExperiences, getFormations, getProfilePictureUrl } from "@/lib/content";

export const useExperiences = () => {
  const { language } = useLanguage();
  const data: Experience[] = getExperiences(language);
  return { data, isLoading: false, error: null as Error | null };
};

export const useEducation = () => {
  const { language } = useLanguage();
  const data: Education[] = getFormations(language);
  return { data, isLoading: false, error: null as Error | null };
};

export { getProfilePictureUrl };
