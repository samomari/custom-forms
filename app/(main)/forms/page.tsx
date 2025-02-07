"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/templates/new")} variant="link">
        <strong className="text-zinc-600 dark:text-zinc-300">
          Fill out a form
        </strong>
      </Button>
    </div>
  );
}
