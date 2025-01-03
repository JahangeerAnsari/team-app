import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "sonner";

interface PreferenceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}
const PreferenceModal = ({
  initialValue,
  open,
  setOpen,
}: PreferenceModalProps) => {
  const router = useRouter();
   const workspaceId = useWorkspaceId()
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleteWorkspace } =
    useDeleteWorkspace();

   const handleDeleteWorkspace = () => {
    
     deleteWorkspace(
       {
         id: workspaceId,
  
       },
       {
         onSuccess: () => {
           toast.success("Workspace deleted!");
           // after delete the workspace we want to back to the home page("/")
           router.replace("/")
         },
         onError: () => {
           toast.error("Failed to delete workspace");
         },
       }
     );
   };
  
  const handleUpdateWorkspace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace({
      id: workspaceId,
      name:value
    }, {
      onSuccess: () => {
        toast.success("Workspace update");
       setEditOpen(false)
      },
      onError: () => {
        toast.error("Failed to update workspace")
      }
      
    }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace Name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remane this workspace</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleUpdateWorkspace}>
                <Input
                  disabled={isUpdatingWorkspace}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  minLength={3}
                  maxLength={88}
                  placeholder="Workspace name e.g. 'Work','Place', 'Home'"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="outline" disabled={isUpdatingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="outline"
                    disabled={isUpdatingWorkspace}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            disabled={isDeleteWorkspace}
            onClick={handleDeleteWorkspace}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceModal;
