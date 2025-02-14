import { db } from "@/drizzle";
import { template, privateTemplateAccess } from "@/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, or, eq } from "drizzle-orm";

export const GetAvailableTemplates = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return await db
        .select({
          id: template.id,
          title: template.title,
          description: template.description,
          imageUrl: template.imageUrl,
        })
        .from(template)
        .where(eq(template.isPublic, true))
        .orderBy(desc(template.formCount));
    }

    const userTemplates = await db
      .select({
        id: template.id,
        title: template.title,
        description: template.description,
        imageUrl: template.imageUrl,
      })
      .from(template)
      .leftJoin(
        privateTemplateAccess,
        eq(privateTemplateAccess.templateId, template.id),
      )
      .where(
        or(
          eq(template.isPublic, true),
          eq(template.userId, user.id),
          eq(privateTemplateAccess.userId, user.id),
        ),
      )
      .orderBy(desc(template.formCount))
      .execute();

    return userTemplates;
  } catch (error) {
    console.error("ERROR_FETCHING_TEMPLATES:", error);
    return [];
  }
};
