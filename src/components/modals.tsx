import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";
import { mutation } from "../../convex/_generated/server";

const Modals = () => {
    // to prevent hyderation error 
    const [mouted, setMounted] = useState(false);
    // useEffect only work with "use client"   
    useEffect(() => {
       setMounted(true)   
    }, [])
    if (!mouted) { 
        return null
    }
    return (
        <>
            <CreateWorkspaceModal/>
        </>
      );
}
 
export default Modals;