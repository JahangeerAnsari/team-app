"use client";

import { useGetchannel } from "@/features/channels/api/use-get-channelById";
import { useChannelId } from "@/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import ChannelHeader from "./header";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId()
  const { data: channel, isLoading: channeLoading } = useGetchannel({
    id: channelId,
  });
  
    if (channeLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader className="animated-spin size-5 text-muted-foreground"/>
             </div>
         )
    }
     if (!channel) {
       return (
         <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
               <TriangleAlert className="animated-spin text-muted-foreground" />
               <span className="text-sm text-muted-foreground">
                   Channel not found
               </span>
         </div>
       );
     }
    return ( 
        <div className="flex flex-col h-full">
            <ChannelHeader title={channel?.name} />
        </div>
     );
}
 
export default ChannelIdPage;