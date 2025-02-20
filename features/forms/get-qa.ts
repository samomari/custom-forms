import { db } from "@/drizzle";
import { answer, question } from "@/drizzle/schema";
import { eq, asc } from "drizzle-orm";

export const GetQA = async (formId: string) => {
  try {
    const answers = await db
      .select({
        id: answer.id,
        type: question.type,
        description: question.description,
        question: question.content,
        answer: answer.value,
      })
      .from(answer)
      .innerJoin(question, eq(answer.questionId, question.id))
      .where(eq(answer.formId, formId))
      .orderBy(asc(question.position));

    return answers;
  } catch (error) {
    console.error("ERROR_FETCHING_FORM_ANSWERS", error);
    return [];
  }
};
