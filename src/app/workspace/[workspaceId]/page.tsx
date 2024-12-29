"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// interface WorkSpaceIdProps{
//     params: {
//         workspaceId:string
//     }
// }
const WorkSpaceIdPage = () => {
    const workspaceId = useWorkspaceId()
    // now by help of id we can fetched data workspace
    const {data} = useGetWorkspace({id:workspaceId})
    return <div>ID: {JSON.stringify(data)}</div>;
};
 
export default WorkSpaceIdPage;