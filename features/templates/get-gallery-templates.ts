import { db } from "@/drizzle";
import { privateTemplateAccess, template, user } from "@/drizzle/schema";
import { desc, eq, or } from "drizzle-orm";
import { currentUser } from "@/features/users/current-user";

type SortByField = typeof template.createdAt | typeof template.formCount;

const getTemplates = async (sortBy: SortByField, limit: number | null) => {
  try {
    const userData = await currentUser();
    if (!userData) {
      const query = db
        .select({
          id: template.id,
          title: template.title,
          description: template.description,
          imageUrl: template.imageUrl,
          username: user.username,
        })
        .from(template)
        .innerJoin(user, eq(template.userId, user.id))
        .where(eq(template.isPublic, true))
        .orderBy(desc(sortBy));

      if (limit) {
        query.limit(limit);
      }
      return await query;
    }

    const query = db
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
        eq(privateTemplateAccess.templateId, template.id)
      )
      .where(
        or(
          eq(template.isPublic, true),
          eq(template.userId, userData.id),
          eq(privateTemplateAccess.userId, userData.id)
        )
      )
      .orderBy(desc(sortBy));

    if (limit) {
      query.limit(limit);
    }
    return await query;
  } catch (error) {
    console.error("ERROR_FETCHING_POPULAR_TEMPLATES:", error);
    return [];
  }
};

export const GetLatestTemplates = () => getTemplates(template.createdAt, 5);

export const GetPopularTemplates = () => getTemplates(template.formCount, 5);

export const GetAvailableTemplates = () =>
  getTemplates(template.formCount, null);
