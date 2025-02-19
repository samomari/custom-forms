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
      })
      .from(form)
      .innerJoin(template, eq(form.templateId, template.id))
      .where(eq(form.userId, userId));

    return userForms;
  } catch (error) {
    console.error("ERROR_FETCHING_USER_FORMS", error);
    return [];
  }
};
