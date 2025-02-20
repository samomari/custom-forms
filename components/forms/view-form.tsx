"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { QuestionAnswer } from "@/types";
import { useRouter } from "next/navigation";

interface ViewFormProps {
  id: string;
  title: string;
  description?: string | null;
  qa: QuestionAnswer[];
  isEditor?: boolean;
}

export default function ViewForm({
  id,
  title,
  description,
  qa,
  isEditor,
}: ViewFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    router.push(`/forms/${id}/edit`);
  };

  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Card className="p-6 shadow-lg rounded-xl space-y-4">
          <CardHeader className="text-xl uppercase text-center">
            <CardTitle className="break-words">{title}</CardTitle>
            <CardDescription className="break-words">
              {description}
            </CardDescription>
          </CardHeader>
          <div className="mt-6">
            <ul className="space-y-3">
              {qa.map((q: QuestionAnswer) => (
                <div key={q.id} className="space-y-2">
                  <Label className="text-md">{q.question}</Label>
                  {q.description && (
                    <Label className="text-sm text-muted-foreground block">
                      {q.description}
                    </Label>
                  )}
                  <Input value={q.answer} disabled className="font-medium" />
                </div>
              ))}
            </ul>
          </div>
          {isEditor && (
            <>
              <ActionTooltip label="Edit Form">
                <Button variant="ghost" onClick={() => handleEdit()}>
                  <Pencil className="h-5 w-5 mr-1" />
                </Button>
              </ActionTooltip>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <ActionTooltip label="Delete Form">
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setOpen(true)}
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </ActionTooltip>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-baseline">
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => console.log("Delete form")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
