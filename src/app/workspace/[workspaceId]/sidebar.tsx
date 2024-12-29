import { usePathname } from "next/navigation";
import UserButton from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarButton from "./sidebar-button";
import { Bell, Home, MessageSquare } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive={pathname.includes('/workspace')} />
      <SidebarButton icon={MessageSquare} label="Message" />
      <SidebarButton icon={Bell} label="Notification" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
