import { db } from "@/drizzle";
import { template, topic } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetUserTemplates = async (userId: string) => {
  try {
    const userTemplates = await db
      .select({
        id: template.id,
        updatedAt: template.updatedAt,
        topic: topic.name,
        title: template.title,
      })
      .from(template)
      .innerJoin(topic, eq(template.topicId, topic.id))
      .where(eq(template.userId, userId));

    return userTemplates;
  } catch (error) {
    console.error("ERROR_FETCHING_USER_TEMPLATES", error);
    return [];
  }
};
