import { db } from "@/drizzle";
import { template, user } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

type SortByField = typeof template.createdAt | typeof template.formCount;

const getTemplates = async (sortBy: SortByField) => {
  try {
    const templates = await db
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
      .orderBy(desc(sortBy))
      .limit(5);

    return templates;
  } catch (error) {
    console.error("ERROR_FETCHING_POPULAR_TEMPLATES:", error);
    return [];
  }
};

export const GetLatestTemplates = () => getTemplates(template.createdAt);

export const GetPopularTemplates = () => getTemplates(template.formCount);
