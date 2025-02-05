"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MinusIcon, PlusIcon } from "lucide-react";

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
    })
  ),
});

export default function Template() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      imageUrl: "",
      questions: [{ question: "", type: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                  <FormItem>
                    <FormLabel className="uppercase font-bold">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter template title..."
                        {...field}
                        className="w-full font-semibold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold">
                      Description (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter template description..."
                        {...field}
                        className="w-full font-semibold"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Card>
            <Card className="p-6 shadow-lg rounded-xl space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold">
                      Template Topic
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="font-semibold">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem
                            key={topic}
                            value={topic}
                            className="font-semibold"
                          >
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold">
                      Template Image (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image url..."
                        {...field}
                        className="w-full font-semibold"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Card>
            <div className="flex flex-col space-y-4">
              {fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="flex items-center space-x-4 p-6 shadow-lg rounded-xl "
                >
                  <div className="w-2/3">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase font-bold">
                            Question
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your question..."
                              {...field}
                              className="w-full font-semibold"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/3">
                    <FormField
                      control={form.control}
                      name={`questions.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase font-bold">
                            Question type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {types.map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  className="font-semibold"
                                >
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-end mt-2 space-x-2">
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
                onClick={() => append({ question: "", type: "" })}
                className="flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
