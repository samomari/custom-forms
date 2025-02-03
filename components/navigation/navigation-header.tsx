"use client";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { useRouter } from "next/navigation";

interface NavigationHeaderProps {
  user: any
}

export function NavigationHeader({
  user,
}: NavigationHeaderProps) {
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
  );
}