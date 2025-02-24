"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Pencil, Trash } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { QuestionType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GetResponseType } from "@/lib/utils/get-response-type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDeleteTemplate } from "@/lib/utils/delete-template";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useTranslations } from "next-intl";

interface ViewTemplateProps {
  id: string;
  title: string;
  description?: string | null;
  likeCount: number;
  questions: QuestionType[];
  isEditor: boolean;
  user: any;
  topicName: string;
}

export default function ViewTemplate({
  id,
  title,
  description,
  likeCount,
  questions,
  isEditor,
  user,
  topicName,
}: ViewTemplateProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(likeCount);
  const [open, setOpen] = useState(false);
  const { deleteTemplate } = useDeleteTemplate();
  const t = useTranslations();

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/likes", {
        userId: user.id,
        templateId: id,
      });
      if (response.status === 200) {
        setLikes((prev) => prev + 1);
        toast({
          title: t("API.success"),
          description: t(`API.${response.data.message}`),
        });
      }
    } catch (error) {
      toast({
        title: t("API.error"),
        description:
          // @ts-expect-error ignore
          t(`API.${error.response?.data?.message}`),
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  const handleEdit = () => {
    router.push(`/templates/${id}/edit`);
  };

  const handleDelete = () => {
    deleteTemplate(id);
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
            <p className="text-sm text-muted-foreground font-medium">
              {t(`Topic.${topicName}`)}
            </p>
          </CardHeader>
          <div className="mt-6">
            <ul className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <Label htmlFor={`question-${q.id}-input`} className="text-md">
                    {q.text}
                  </Label>
                  {q.description && (
                    <Label
                      htmlFor={`question-${q.id}-input`}
                      className="text-sm text-muted-foreground block"
                    >
                      {q.description}
                    </Label>
                  )}
                  <Input
                    id={`question-${q.id}-input`}
                    value={t("Template.expectedAnswer", {
                      type: t(
                        `QuestionType.${GetResponseType(q.type)}`,
                      ).toLowerCase(),
                    })}
                    disabled
                    className="font-medium"
                  />
                </div>
              ))}
            </ul>
          </div>
          {user && (
            <div className="mt-6 flex justify-between items-center">
              <div className="flex">
                <ActionTooltip label={t("Template.like")}>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleLike()}
                  >
                    <Heart className="h-5 w-5 mr-1" /> {likes}
                  </Button>
                </ActionTooltip>
                {isEditor && (
                  <>
                    <ActionTooltip label={t("Template.editTemplate")}>
                      <Button variant="ghost" onClick={handleEdit}>
                        <Pencil className="h-5 w-5 mr-1" />
                      </Button>
                    </ActionTooltip>
                    <ActionTooltip label={t("Template.deleteTemplate")}>
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
              </div>

              <Button
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => router.push(`/forms/new/${id}`)}
              >
                {t("Template.useTemplate")}
              </Button>
            </div>
          )}
        </Card>
      </div>
      <ConfirmDialog onConfirm={handleDelete} open={open} setOpen={setOpen} />
    </div>
  );
}
