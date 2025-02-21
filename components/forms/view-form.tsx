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
import { useState } from "react";
import { QuestionAnswer } from "@/types";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "../ui/confirm-dialog";
import { useDeleteForm } from "@/lib/utils/delete-form";

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
  const { deleteForm } = useDeleteForm();

  const handleEdit = () => {
    router.push(`/forms/${id}/edit`);
  };

  const handleDelete = () => {
    deleteForm(id);
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
              <ActionTooltip label="Delete Form">
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setOpen(true)}
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </ActionTooltip>
            </>
          )}
        </Card>
      </div>
      <ConfirmDialog
        title="Are you sure?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
