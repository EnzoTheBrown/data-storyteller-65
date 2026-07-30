import { useQuery } from "@tanstack/react-query";
import type { Experience, Education } from "@/types/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  fetchJson,
  getLocalExperiences,
  getLocalFormations,
  getProfilePictureUrl,
} from "@/lib/content";

export const useExperiences = () => {
  const { language } = useLanguage();

  return useQuery<Experience[]>({
    queryKey: ["experiences", language],
    queryFn: () =>
      fetchJson<Experience[]>(
        `experiences/experiences.${language}.json`,
        getLocalExperiences(language),
      ),
    placeholderData: getLocalExperiences(language),
    staleTime: 1000 * 60 * 5,
  });
};

export const useEducation = () => {
  const { language } = useLanguage();

  return useQuery<Education[]>({
    queryKey: ["education", language],
    queryFn: () =>
      fetchJson<Education[]>(
        `formations/formations.${language}.json`,
        getLocalFormations(language),
      ),
    placeholderData: getLocalFormations(language),
    staleTime: 1000 * 60 * 5,
  });
};

export { getProfilePictureUrl };
