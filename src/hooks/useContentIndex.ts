import { useQuery } from "@tanstack/react-query";
import { getIndexUrl, type ContentIndex } from "@/lib/s3";

export const useContentIndex = () => {
  return useQuery<ContentIndex>({
    queryKey: ["content-index"],
    queryFn: async () => {
      const response = await fetch(getIndexUrl());
      if (!response.ok) throw new Error("Failed to fetch content index");
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
