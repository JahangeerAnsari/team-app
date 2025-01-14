import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelProps{
    id:Id<"channels">
}
export const useGetchannel = ({ id }: UseGetChannelProps) => {
  const data = useQuery(api.channels.getChannelById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};