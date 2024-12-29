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
import { useCreateWorkSpaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const { mutate, data, isPending } = useCreateWorkspace();
  const [open, setOpen] = useCreateWorkSpaceModal();
  const [name, setName] = useState("");
  const handleClose = () => {
    // TODO: to clear formdata
    setOpen(false);
  };
  const handleSubmitWorkSpace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name }, {
      onSuccess(data) {
        console.log("data",data);
        
      },
    })
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a WorkSpace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitWorkSpace} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work','Place', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
