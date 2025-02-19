import { db } from "@/drizzle";
import { form, template, user } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const GetAllForms = async () => {
  try {
    const forms = await db
      .select({
        id: form.id,
        updatedAt: form.updatedAt,
        title: template.title,
        username: user.username,
      })
      .from(form)
      .innerJoin(template, eq(form.templateId, template.id))
      .innerJoin(user, eq(form.userId, user.id));

    return forms;
  } catch (error) {
    console.error("ERROR_FETCHING_ALL_FORMS", error);
    return [];
  }
};
