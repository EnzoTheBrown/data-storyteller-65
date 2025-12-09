import { useQuery } from "@tanstack/react-query";
import type { Experience, Education } from "@/types/portfolio";

const API_BASE = "https://ee82f53f58e6.ngrok-free.app";

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
    queryFn: () => fetchWithNgrok(`${API_BASE}/experiences`),
  });
};

export const useEducation = () => {
  return useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: () => fetchWithNgrok(`${API_BASE}/education`),
  });
};

export const getProfilePictureUrl = () => `${API_BASE}/me.png`;
