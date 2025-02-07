"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { LogIn, Loader2 } from "lucide-react";

export function NaviHeader() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <div className="w-full dark:bg-[#0C0A09] bg-[#E3E5E8]">
      <div className="flex justify-between">
        <div className="flex justify-start">
          <Button onClick={() => router.push("/")} variant="ghost">
            <strong className="text-2xl text-zinc-600 dark:text-zinc-300">
              Custom Forms
            </strong>
          </Button>
          <Button onClick={() => router.push("/templates")} variant="link">
            <strong className="text-zinc-600 dark:text-zinc-300">
              templates
            </strong>
          </Button>
          <Button onClick={() => router.push("/forms")} variant="link">
            <strong className="text-zinc-600 dark:text-zinc-300">forms</strong>
          </Button>
        </div>
        <div className="flex items-center pr-2">
          <ModeToggle />
          {isSignedIn === true && <UserButton />}
          {isSignedIn === undefined && (
            <Loader2 className="animate-spin w-6 h-6" />
          )}
          {isSignedIn === false && (
            <Button onClick={() => router.push("/sign-in")} variant="ghost">
              <LogIn />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
