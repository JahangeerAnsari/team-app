"use client";
import { CreateChannelModal } from "@/features/channels/components/create-channel-model";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";

const Modals = () => {
  // to prevent hyderation error
  const [mouted, setMounted] = useState(false);
  // useEffect only work with "use client"
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mouted) {
    return null;
  }
  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};

export default Modals;
