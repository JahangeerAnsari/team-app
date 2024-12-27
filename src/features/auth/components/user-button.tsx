"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../hooks/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const UserButton = () => {
    const { data, isLoading } = useCurrentUser();
    const {signOut} = useAuthActions()
  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }
  // if there is no data return null
  if (!data) {
    return null;
  }
  const { email, image, name } = data;
  const avatarFallBack = name!.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt="name" src={image} />
          <AvatarFallback className="bg-sky-400 text-white">{avatarFallBack}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="W-60" align="center" side="right">
        <DropdownMenuItem onClick={() => signOut()} className="h-10">
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;