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
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        answerType: z.number().int(),
        answer: z.any(),
      }),
    )
    .refine(
      (answers) => {
        return answers.every((answer) => {
          const { answerType, answer: userAnswer } = answer;

          switch (answerType) {
            case 0:
              return (
                typeof userAnswer === "string" && userAnswer.trim().length > 0
              );
            case 1:
              return typeof userAnswer === "string";
            case 2:
              return Number.isInteger(userAnswer) && userAnswer > 0;
            case 3:
              return true;
            default:
              return false;
          }
        });
      },
      {
        message: "Some answers do not match their question types.",
      },
    ),
});
