import { db } from "@/drizzle";
import { form, template, topic } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const GetUserFilledForms = async (userId: string) => {
  try {
    const userForms = await db
      .select({
        id: form.id,
        updatedAt: form.updatedAt,
        title: template.title,
        topic: topic.name,
      })
      .from(form)
      .innerJoin(template, eq(form.templateId, template.id))
      .innerJoin(topic, eq(template.topicId, topic.id))
      .where(eq(form.userId, userId));

    return userForms;
  } catch (error) {
    console.error("ERROR_FETCHING_USER_FORMS", error);
    return [];
  }
};
