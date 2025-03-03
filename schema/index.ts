import { z } from "zod";
import { useTranslations } from "next-intl";

export const useTemplateSchema = () => {
  const t = useTranslations("TemplateValidation");

  return z.object({
    title: z.string().min(1, { message: t("titleRequired") }),
    description: z.string(),
    topicId: z.string().min(1, { message: t("topicRequired") }),
    imageUrl: z.string(),
    questions: z.array(
      z.object({
        id: z.string().optional(),
        question: z.string().min(1, { message: t("questionRequired") }),
        description: z.string(),
        type: z
          .number()
          .int()
          .lte(3, { message: t("typeRequired") }),
        position: z.number(),
      }),
    ),
    isPublic: z.boolean(),
    selectedUsers: z.array(z.string()).optional(),
  });
};

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

export const useSalesforceSchema = () => {
  const t = useTranslations("TemplateValidation");

  return z.object({
    firstName: z.string().min(1, { message: t("firstNameRequired") }),
    lastName: z.string().min(1, { message: t("lastNameRequired") }),
    phone: z.string(),
    website: z.string(),
    industry: z.string(),
    title: z.string(),
  });
};
