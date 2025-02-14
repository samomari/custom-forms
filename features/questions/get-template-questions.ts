import { db } from "@/drizzle";
import { question } from "@/drizzle/schema";
import { eq, asc } from "drizzle-orm";

export const GetTemplateQuestions = async (templateId: string) => {
  try {
    const questions = await db
      .select({
        id: question.id,
        text: question.content,
        type: question.type,
      })
      .from(question)
      .where(eq(question.templateId, templateId))
      .orderBy(asc(question.position));

    return questions;
  } catch (error) {
    console.error("ERROR_FETCHING_TEMPLATE_QUESTIONS", error);
    return [];
  }
};
