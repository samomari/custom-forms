import { z } from "zod";

export const templateSchema = z.object({
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
      id: z.string().optional(),
      question: z.string().min(1, { message: "Question is required." }),
      type: z.number().int().lte(3, { message: "Type is required." }),
      position: z.number(),
    }),
  ),
  isPublic: z.boolean(),
  selectedUsers: z.array(z.string()).optional(),
});

export const formSchema = z.object({
  templateId: z.string(),
  userId: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.any(),
    }),
  ),
});
