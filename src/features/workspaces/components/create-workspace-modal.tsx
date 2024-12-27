"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCreateWorkSpaceModal } from "../store/use-create-workspace-modal"
export const CreateWorkspaceModal = () => {
    const [open,setOpen] =useCreateWorkSpaceModal()
    const handleClose = () => {
        // TODO: to clear formdata
        setOpen(false)
    }
    
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a WorkSpace</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}