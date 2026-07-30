import { contentIndex, type ContentIndex } from "@/lib/content";

export const useContentIndex = () => {
  return {
    data: contentIndex as ContentIndex,
    isLoading: false,
    error: null as Error | null,
  };
};
