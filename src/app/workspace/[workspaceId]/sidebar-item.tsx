import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
const SidebarItemVariants = cva("flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden", {
  variants: {
    variant: {
      default: "text-[#f9edffcc]",
      active:"text-[#481349] bg-white/90 hover:bg-white/90",
    }
  }, defaultVariants: {
    variant:"default"
  }
})
interface SidebarItemProps{
    label: string,
    icon: IconType |LucideIcon,
  id: string,
  variant?: VariantProps<typeof SidebarItemVariants>["variant"];
}

export const SidebarItem = ({ icon: Icon, id, label, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button variant="transprant" size="sm" asChild
    className={cn(SidebarItemVariants({variant:variant}))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};