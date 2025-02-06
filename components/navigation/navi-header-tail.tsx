"use client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

type User = {
  id: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
  createdAt: Date;
  updatedAt: Date;
};

interface HeaderTailProps {
  user: User | null;
}
export function NaviHeaderTail({ user }: HeaderTailProps) {
  const router = useRouter();
  return (
    <div className="flex justify-end space-x-2 pr-2 dark:bg-[#1E1F22] bg-[#E3E5E8]">
      <ModeToggle />
      {user && <UserButton />}
      {!user && (
        <h1>
          <Button onClick={() => router.push("/sign-in")} variant="ghost">
            <LogIn />
          </Button>
        </h1>
      )}
    </div>
  );
}
