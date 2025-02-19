import { db } from "@/drizzle";
import { template, user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetAllTemplates = async () => {
  try {
    const templates = await db
      .select({
        id: template.id,
        updatedAt: template.updatedAt,
        title: template.title,
        formCount: template.formCount,
        likeCount: template.likeCount,
        username: user.username,
      })
      .from(template)
      .innerJoin(user, eq(template.userId, user.id));

    return templates;
  } catch (error) {
    console.error("ERROR_FETCHING_ALL_TEMPLATES", error);
    return [];
  }
};
