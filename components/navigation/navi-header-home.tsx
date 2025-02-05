"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeaderHome() {
  const router = useRouter();
  return (
    <div className="flex justify-start">
      <Button onClick={() => router.push("/")} variant="ghost">
        <strong className="text-2xl text-zinc-600 dark:text-zinc-300">
          Custom Forms
        </strong>
      </Button>
    </div>
  );
}
