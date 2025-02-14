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
} from "../ui/alert-dialog";

interface ViewTemplateProps {
  id: string;
  title: string;
  description?: string | null;
  likeCount: number;
  questions: QuestionType[];
  isEditor: boolean;
  // eslint-disable-next-line
  user: any;
}

export default function ViewTemplate({
  id,
  title,
  description,
  likeCount,
  questions,
  isEditor,
  user,
}: ViewTemplateProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(likeCount);
  const [open, setOpen] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/likes", {
        userId: user.id,
        templateId: id,
      });
      if (response.status === 200) {
        setLikes((prev) => prev + 1);
        toast({
          title: "Success",
          description: "Template liked",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          // @ts-expect-error ignore
          error.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  const handleEdit = () => {
    router.push(`/templates/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/templates/${id}`);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Template successfully deleted",
        });
        router.push("/templates");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          // @ts-expect-error ignore
          error.response?.data.message || "An unexpected error occured",
        variant: "destructive",
      });
      // @ts-expect-error ignore
      if (error.response?.status === 404) {
        router.push("/templates");
      }
    }
  };

  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Card className="p-6 shadow-lg rounded-xl space-y-4">
          <CardHeader className="text-xl uppercase text-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="break-words">
              {description}
            </CardDescription>
          </CardHeader>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Questions</h2>
            <ul className="space-y-3">
              {questions.map((q) => (
                <li key={q.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{q.text}</span>
                    <span className="text-sm">Answer type {q.type}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {user && (
            <div className="mt-6 flex justify-between items-center">
              <div className="flex">
                <ActionTooltip label="Like">
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
                    <ActionTooltip label="Edit Template">
                      <Button variant="ghost" onClick={handleEdit}>
                        <Pencil className="h-5 w-5 mr-1" />
                      </Button>
                    </ActionTooltip>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger asChild>
                        <ActionTooltip label="Delete Template">
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
                            This action cannot be undone. This will permanently
                            delete this template.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setOpen(false)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete()}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>

              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                Use Template
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
