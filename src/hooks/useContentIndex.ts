import { useQuery } from "@tanstack/react-query";
import { fetchContentIndex, localContentIndex, type ContentIndex } from "@/lib/content";

export const useContentIndex = () => {
  return useQuery<ContentIndex>({
    queryKey: ["content-index"],
    queryFn: fetchContentIndex,
    initialData: localContentIndex,
    staleTime: 1000 * 60 * 5,
  });
};
