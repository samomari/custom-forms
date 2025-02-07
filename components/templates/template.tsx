"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
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

const topics = ["Geography", "Quiz", "History"];

const types = [
  "Single-line string",
  "Multiple-line text",
  "Positive integer",
  "Checkbox",
];

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string(),
  topic: z.string().refine((value) => topics.includes(value), {
    message: "Topic is required.",
  }),
  imageUrl: z.string(),
  questions: z.array(
    z.object({
      question: z.string().min(1, { message: "Question is required." }),
      type: z.string().min(1, { message: "Type is required." }),
      position: z.number(),
    })
  ),
  isPublic: z.boolean(),
});

export default function Template() {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      imageUrl: "",
      questions: [{ question: "", type: "", position: 0 }],
      isPublic: true,
    },
  });

  useEffect(() => {
    setIsMounted(true);
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
        newIndex
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
                name="topic"
                render={({ field }) => (
                  <FormSelect
                    label="Template Topic"
                    options={topics}
                    field={field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormInput
                    label="Template Image (optional)"
                    placeholder="Enter image url"
                    field={field}
                  />
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
                  <Button
                    type="button"
                    onClick={() => remove(fields.length - 1)}
                    variant="destructive"
                    className="flex items-center space-x-2"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() =>
                    append({ question: "", type: "", position: fields.length })
                  }
                  className="flex items-center space-x-2"
                >
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
