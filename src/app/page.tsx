"use client";

import UserButton from "@/features/auth/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
 const {signOut}= useAuthActions()
  return (
    // <Button onClick={() =>signOut()}>
    //   SingOut
    // </Button>
    <UserButton/>
  )
}