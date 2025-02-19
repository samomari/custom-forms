import { db } from "@/drizzle";
import { form, template } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetFormData = async (formId: string) => {
  try {
    const formData = await db
      .select({
        id: form.id,
        userId: form.userId,
        title: template.title,
        description: template.description,
      })
      .from(form)
      .innerJoin(template, eq(form.templateId, template.id))
      .where(eq(form.id, formId))
      .limit(1);

    return formData[0];
  } catch (error) {
    console.error("ERROR_FETCHING_FORM_DATA", error);
    return null;
  }
};
