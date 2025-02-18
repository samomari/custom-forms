import { db } from "@/drizzle";
import { form, template } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const GetUserFilledForms = async (userId: string) => {
  try {
    const userForms = await db
      .select({
        id: form.id,
        updatedAt: form.updatedAt,
        title: template.title,
        imageUrl: template.imageUrl,
      })
      .from(form)
      .innerJoin(template, eq(form.templateId, template.id))
      .where(eq(form.userId, userId))
      .orderBy(desc(form.updatedAt));

    return userForms;
  } catch (error) {
    console.error("ERROR_FETCHING_USER_FORMS", error);
    return [];
  }
};
