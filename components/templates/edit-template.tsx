"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TemplateQuestion } from "./template-question";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { ImageUpload } from "@/components/image-upload";
import { ActionTooltip } from "@/components/action-tooltip";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { UsersSelect } from "./users-select";
import { QuestionType, TemplateType, TopicType, UserType } from "@/types";
import { FormTextArea } from "@/components/ui/form-textarea";
import { templateSchema } from "@/schema";

interface EditTemplateProps {
  template: TemplateType;
  questions: QuestionType[];
  users: UserType[];
  allowedUsers: { id: string }[];
  topics: TopicType[];
}

export default function EditTemplate({
  template,
  questions,
  users,
  allowedUsers,
  topics,
}: EditTemplateProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    allowedUsers?.map((user) => user.id) || [],
  );
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      title: template?.title || "",
      description: template?.description || "",
      topicId: template?.topicId || "",
      imageUrl: template?.imageUrl || "",
      questions: questions.map((q, index) => ({
        id: q.id,
        question: q.text,
        description: q.description ?? "",
        type: q.type,
        position: index,
      })) || [{ question: "", description: "", type: "", position: 0 }],
      isPublic: template?.isPublic === undefined ? true : template.isPublic,
      selectedUsers: allowedUsers?.map((user) => user.id) || [],
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const hasChanges = (
    values: z.infer<typeof templateSchema>,
    template: TemplateType,
    questions: QuestionType[],
    allowedUsers: { id: string }[],
  ) => {
    const hasFieldChanges =
      values.title !== template?.title ||
      values.description !== template?.description ||
      values.topicId !== template?.topicId ||
      values.imageUrl !== template?.imageUrl ||
      values.isPublic !== template?.isPublic ||
      JSON.stringify(values.selectedUsers) !==
        JSON.stringify(allowedUsers.map((user) => user.id));

    const hasQuestionChanges = values.questions.some((question, index) => {
      const originalQuestion = questions[index];
      if (!originalQuestion) {
        return true;
      }
      return (
        question.question !== originalQuestion.text ||
        question.description !== originalQuestion.description ||
        question.type !== originalQuestion.type
      );
    });

    return hasFieldChanges || hasQuestionChanges;
  };

  const onSubmit = async (values: z.infer<typeof templateSchema>) => {
    if (!hasChanges(values, template, questions, allowedUsers)) return;
    try {
      await axios.patch(`/api/templates/${template?.id}`, {
        title: values.title,
        description: values.description,
        topicId: values.topicId,
        imageUrl: values.imageUrl,
        questions: values.questions,
        isPublic: values.isPublic,
        selectedUsers: values.selectedUsers,
      });
      toast({
        title: "Success",
        description: "Template updated",
      });
      router.push(`/templates/${template?.id}`);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedQuestions = form.getValues("questions");

      const reorderedQuestions = arrayMove(
        updatedQuestions,
        oldIndex,
        newIndex,
      ).map((q, index) => ({
        ...q,
        position: index,
      }));

      form.setValue("questions", reorderedQuestions, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    form.setValue("isPublic", checked);

    if (checked) {
      setSelectedUsers([]);
      form.setValue("selectedUsers", []);
    }
  };

  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="p-6 shadow-lg rounded-xl space-y-4">
              <CardHeader className="text-xl uppercase text-center">
                <CardTitle>Edit Template</CardTitle>
              </CardHeader>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormInput
                    label="Title"
                    placeholder="Enter template title"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormTextArea
                    label="Description (optional)"
                    placeholder="Enter template description"
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <FormSelect
                    label="Template Topic"
                    options={topics.map((topic) => ({
                      value: topic.id,
                      label: topic.name,
                    }))}
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-4 uppercase font-bold">
                      Template Image (optional)
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-4">
                      <FormLabel className="mr-4 uppercase font-bold">
                        Public Template
                      </FormLabel>
                      <Switch
                        id="visibility-switch"
                        checked={field.value}
                        onCheckedChange={handleSwitchChange}
                      />
                      {!field.value && (
                        <UsersSelect
                          form={form}
                          users={users}
                          selectedUsers={selectedUsers}
                          setSelectedUsers={setSelectedUsers}
                        />
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </Card>

            {isMounted && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement]}
              >
                <SortableContext
                  items={fields.map((field) => field.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col space-y-4">
                    {fields.map((field, index) => (
                      <TemplateQuestion
                        key={field.id}
                        field={field}
                        index={index}
                        form={form}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
            <div className="flex justify-between pb-2">
              <div className="flex space-x-2">
                {fields.length > 1 && (
                  <ActionTooltip label="Remove question">
                    <Button
                      type="button"
                      onClick={() => remove(fields.length - 1)}
                      variant="destructive"
                      className="flex items-center space-x-2"
                    >
                      <MinusIcon className="w-5 h-5" />
                    </Button>
                  </ActionTooltip>
                )}
                <ActionTooltip label="Add question">
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        id: "",
                        question: "",
                        description: "",
                        type: 0,
                        position: fields.length,
                      })
                    }
                    className="flex items-center space-x-2"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </Button>
                </ActionTooltip>
              </div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
