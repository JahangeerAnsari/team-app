import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import Hint from "@/components/hint";
import PreferenceModal from "./[workspaceId]/preference-model";
import { useState } from "react";
interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin:boolean
}
const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const[preferenceOpen,setPreferenceOpen] = useState(false)
  return (
    <>
      <PreferenceModal
        open={preferenceOpen}
        setOpen={setPreferenceOpen}
        initialValue={workspace.name}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-x-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transprant"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-5 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div
                className="size-9 relative overflow-hidden bg-[#616061] text-white
          font-semibold text-xl rounded-md flex items-center justify-center mr-2
          "
              >
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex items-start flex-col">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace{" "}
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2">
                  Invite People to {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setPreferenceOpen(true)}
                  className="cursor-pointer py-2"
                >
                  Preferrance
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="Filter" side="bottom">
            <Button variant="transprant" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>

          <Hint label="New Message" side="right">
            <Button variant="transprant" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default WorkspaceHeader;
