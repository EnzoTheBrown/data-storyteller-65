import { useQuery } from "@tanstack/react-query";
import type { Experience, Education } from "@/types/portfolio";
import { experiencesData, educationData } from "@/data/portfolioData";

const S3_BASE = "https://s3.eu-west-1.amazonaws.com/enzolebrun.dev";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useExperiences = () => {
  return useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      try {
        return await fetchData(`${S3_BASE}/experiences.json`);
      } catch {
        // Fallback to local data if API is unavailable
        return experiencesData;
      }
    },
    initialData: experiencesData,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useEducation = () => {
  return useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => {
      try {
        return await fetchData(`${S3_BASE}/education.json`);
      } catch {
        // Fallback to local data if API is unavailable
        return educationData;
      }
    },
    initialData: educationData,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const getProfilePictureUrl = () => `${S3_BASE}/me.png`;
