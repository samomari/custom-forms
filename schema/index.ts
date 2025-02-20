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
      description: z.string(),
      type: z.number().int().lte(3, { message: "Type is required." }),
      position: z.number(),
    }),
  ),
  isPublic: z.boolean(),
  selectedUsers: z.array(z.string()).optional(),
});

export const formCreationSchema = z.object({
  templateId: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.any(),
    }),
  ),
});

export const formEditSchema = z.object({
  formId: z.string(),
  answers: z.array(
    z.object({
      answerId: z.string(),
      answer: z.any(),
    }),
  ),
});
