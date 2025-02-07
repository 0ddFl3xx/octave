import { useQuery } from "@tanstack/react-query";
import { getFeaturedTracks } from "@/lib/jamendo";

export function useFeaturedTracks() {
  return useQuery({
    queryKey: ["featuredTracks"],
    queryFn: getFeaturedTracks,
  });
}
