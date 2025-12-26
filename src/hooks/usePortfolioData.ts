import { useQuery } from "@tanstack/react-query";
import type { Experience, Education } from "@/types/portfolio";
import { experiencesData, educationData } from "@/data/portfolioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { getGitHubUrl, getProfilePictureUrl } from "@/lib/github";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useExperiences = () => {
  const { language } = useLanguage();
  
  return useQuery<Experience[]>({
    queryKey: ["experiences", language],
    queryFn: async () => {
      try {
        return await fetchData(getGitHubUrl("experiences/experiences.json", language));
      } catch {
        return experiencesData;
      }
    },
    initialData: experiencesData,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEducation = () => {
  const { language } = useLanguage();
  
  return useQuery<Education[]>({
    queryKey: ["education", language],
    queryFn: async () => {
      try {
        return await fetchData(getGitHubUrl("formations/formations.json", language));
      } catch {
        return educationData;
      }
    },
    initialData: educationData,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export { getProfilePictureUrl };
