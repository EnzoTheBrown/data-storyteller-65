import { useQuery } from "@tanstack/react-query";
import type { Experience, Education } from "@/types/portfolio";
import { experiencesData, educationData } from "@/data/portfolioData";

const API_BASE = "https://46615aacc738.ngrok-free.app";

const fetchWithNgrok = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useExperiences = () => {
  return useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      try {
        return await fetchWithNgrok(`${API_BASE}/experiences`);
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
        return await fetchWithNgrok(`${API_BASE}/education`);
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

export const getProfilePictureUrl = () => `${API_BASE}/me.png`;
