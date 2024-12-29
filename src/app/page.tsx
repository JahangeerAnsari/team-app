"use client";

import UserButton from "@/features/auth/components/user-button";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  //useCreateWorkSpaceModal is used for globaly state managenent
  const router = useRouter()
  const [open, setOpen] = useCreateWorkSpaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  //

  useEffect(() => {
    if (isLoading) {
      return ;
    }
    if (workspaceId) {
      console.log("Redirect to workspace");
      router.replace(`/workspace/${workspaceId}`)

    } else if (!open) {
      setOpen(true);
      console.log("Open workspace creation modal");
    }
  }, [workspaceId, isLoading,router,open]);
  return <UserButton />;
}