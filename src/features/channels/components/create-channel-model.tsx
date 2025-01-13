"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const CreateChannelModal = () => {
  const router = useRouter()
  const [open, setOpen] = useCreateChannelModal();
  const workspaceId  = useWorkspaceId()
  const {data,error,isError,mutate,isPending,isSettled,isSuccess} = useCreateChannel()
     const [name, setName] = useState("");
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value)
  }
  const handleClose = () => {
    setName("");
    setOpen(false)
  }
  const handleSubmitChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name,
      workspaceId
    }, {
      onSuccess: (id) => {
        // TODO we will redirect to the new created channel
             router.push(`/workspace/${workspaceId}/channel/${id}`)
        toast.success("New Channel Created")
          handleClose()
      },
      onError: () => {
        toast.error('Failed to create channel')
      }
     
    })
    
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel Name</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitChannel} className="space-y-4">
          <Input
            value={name}
            onChange={handleChange}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder=" e.g. 'Plan,Budget'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
