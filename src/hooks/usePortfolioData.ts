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
        const url = getGitHubUrl("experiences/experiences.json", language);
        console.log("Fetching experiences from:", url);
        return await fetchData(url);
      } catch (error) {
        console.error("Failed to fetch experiences, using fallback:", error);
        return experiencesData;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export const useEducation = () => {
  const { language } = useLanguage();
  
  return useQuery<Education[]>({
    queryKey: ["education", language],
    queryFn: async () => {
      try {
        const url = getGitHubUrl("formations/formations.json", language);
        console.log("Fetching education from:", url);
        return await fetchData(url);
      } catch (error) {
        console.error("Failed to fetch education, using fallback:", error);
        return educationData;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export { getProfilePictureUrl };
