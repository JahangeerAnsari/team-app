import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteChannel } from "@/features/channels/api/use-delete-channel";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useChannelId } from "@/hooks/use-channel-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "sonner";

interface ChannelHeaderProps {
  title: string;
}
const ChannelHeader = ({ title }: ChannelHeaderProps) => {
  const [value, setValue] = useState(title);
  const router = useRouter()
 
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this Channel?",
    "Are you sure delete this channel"
  )
  //  apis
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId()
  const { mutate: updateChannel, isPending: IsupdatingChannel } =
    useUpdateChannel();
  const {mutate:removeChannel, isPending:IsDeleting} = useDeleteChannel();
const { data: member } = useCurrentMember({ workspaceId });

const handleEditOpen = (value: boolean) => {
  if (member?.role !== "admin") return;
  setEditOpen(value)
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChannel({ id: channelId, name: value }, {
      onSuccess: () => {
        toast.success('Channel Updated');
        setEditOpen(false)
      },
      onError: () => {
        toast.error('Failded to Update')
      }
     })
  }
  const handleDeleteChannel =async () => {
    const ok = await confirm();
    if (!ok) return;
    await removeChannel({ id: channelId }, {
      onSuccess: () => {
        toast.success('delete channel');
        router.push(`/workspace/${workspaceId}`);
      },
      onError: () => {
        toast.error('Failed to delete')
      }
    })
  }
  return (
    <>
      <ConfirmDialog />
      <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-lg font-semibold px-2 overflow-hidden w-auto"
            >
              <span className="truncate"># {title}</span>
              <FaChevronDown className="size-2.5 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
              <DialogTitle># {title}</DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <Dialog open={editOpen} onOpenChange={handleEditOpen}>
                <DialogTrigger asChild>
                  <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Channel name</p>
                      {member?.role === "admin" && (
                        <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                          Edit
                        </p>
                      )}
                    </div>
                    <p className="text-sm"> # {title}</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename this Channel</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      value={value}
                      disabled={IsupdatingChannel}
                      onChange={handleChange}
                      required
                      autoFocus
                      minLength={3}
                      maxLength={80}
                      placeholder="e.g plan-budget"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={IsupdatingChannel}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button disabled={IsupdatingChannel}>Save</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {member?.role === "admin" && (
                <Button
                  onClick={handleDeleteChannel}
                  className="flex items-end gap-x-2 px-5 py-3 bg-white rounded-lg cursor-pointer
                      border hover:bg-gray-50 text-rose-600"
                >
                  <Trash className="size-4" />
                  <p className="text-sm font-semibold">Delete Channel</p>
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChannelHeader;
