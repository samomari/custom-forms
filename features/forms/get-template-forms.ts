import { db } from "@/drizzle";
import { form, user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetTemplateForms = async (id: string) => {
  try {
    const forms = await db
      .select({
        id: form.id,
        username: user.username,
        updatedAt: form.updatedAt,
      })
      .from(form)
      .innerJoin(user, eq(form.userId, user.id))
      .where(eq(form.templateId, id));

    return forms;
  } catch (error) {
    console.error("ERROR_FETCHING_TEMPLATE_FORMS", error);
    return [];
  }
};
