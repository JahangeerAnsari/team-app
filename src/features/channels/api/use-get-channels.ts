import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelsProps{
    workspaceId:Id<"workspaces">
}
export const useGetchannels = ({ workspaceId }: UseGetChannelsProps) => {
  const data = useQuery(api.channels.getChannels, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
};