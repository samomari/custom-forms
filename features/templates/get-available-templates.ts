import { db } from "@/drizzle";
import { template, privateTemplateAccess, user } from "@/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, or, eq } from "drizzle-orm";

export const GetAvailableTemplates = async () => {
  try {
    const userData = await currentUser();

    if (!userData) {
      return await db
        .select({
          id: template.id,
          title: template.title,
          description: template.description,
          imageUrl: template.imageUrl,
          username: user.username,
        })
        .from(template)
        .innerJoin(user, eq(user.id, template.userId))
        .where(eq(template.isPublic, true))
        .orderBy(desc(template.formCount));
    }

    const userTemplates = await db
      .select({
        id: template.id,
        title: template.title,
        description: template.description,
        imageUrl: template.imageUrl,
        username: user.username,
      })
      .from(template)
      .innerJoin(user, eq(user.id, template.userId))
      .leftJoin(
        privateTemplateAccess,
        eq(privateTemplateAccess.templateId, template.id),
      )
      .where(
        or(
          eq(template.isPublic, true),
          eq(template.userId, userData.id),
          eq(privateTemplateAccess.userId, userData.id),
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
