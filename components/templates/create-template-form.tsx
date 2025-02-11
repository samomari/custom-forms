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
import { Card, CardHeader } from "@/components/ui/card";
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
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { ImageUpload } from "@/components/image-upload";
import { ActionTooltip } from "../action-tooltip";

const types = [
  { id: "0", label: "Single-line string" },
  { id: "1", label: "Multiple-line text" },
  { id: "2", label: "Positive integer" },
  { id: "3", label: "Checkbox" },
];

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string(),
  topicId: z.string().min(1, {
    message: "Topic is required.",
  }),
  imageUrl: z.string(),
  questions: z.array(
    z.object({
      question: z.string().min(1, { message: "Question is required." }),
      type: z.string().min(1, { message: "Type is required." }),
      position: z.number(),
    }),
  ),
  isPublic: z.boolean(),
});

export default function CreateTemplateForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topicId: "",
      imageUrl: "",
      questions: [{ question: "", type: "", position: 0 }],
      isPublic: true,
    },
  });

  useEffect(() => {
    setIsMounted(true);
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics");
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.log("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  // eslint-disable-next-line
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

  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="p-6 shadow-lg rounded-xl space-y-4">
              <CardHeader className="text-xl uppercase text-center">
                Create Template
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
                  <FormInput
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
                    <div className="flex items-center">
                      <FormLabel className="mr-4 uppercase font-bold">
                        Public Template
                      </FormLabel>
                      <Switch
                        id="visibility-switch"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
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
                        types={types}
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
                        question: "",
                        type: "",
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
