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

export const CreateChannelModal = () => {
  const router = useRouter();
  
    const [open, setOpen] = useCreateChannelModal();
    console.log("open====>",open);
    
//   const [name, setName] = useState("");
//   const handleClose = () => {
//     // TODO: to clear formdata
//     setOpen(false);
//     setName("");
//   };
//   const handleSubmitWorkSpace = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//   };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel Name</DialogTitle>
        </DialogHeader>
        {/* <form onSubmit={handleSubmitWorkSpace} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work','Place', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form> */}
      </DialogContent>
    </Dialog>
  );
};
