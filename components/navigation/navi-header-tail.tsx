'use client';
import { useRouter } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

interface HeaderTailProps {
  user: any
}
export function NaviHeaderTail({
  user
}: HeaderTailProps) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-end space-x-2 pr-2 dark:bg-[#1E1F22] bg-[#E3E5E8]">
    <ModeToggle />
    {user && (
      <UserButton />
    )}
    {!user && (
      <h1>
        <Button 
          onClick={() => router.push("/sign-in")}
          variant="ghost">
            <LogIn/>
        </Button>
      </h1>
    )}
  </div>
  )
}