import { db } from "@/drizzle";
import { template, topic, user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetAllTemplates = async () => {
  try {
    const templates = await db
      .select({
        id: template.id,
        updatedAt: template.updatedAt,
        title: template.title,
        topic: topic.name,
        formCount: template.formCount,
        likeCount: template.likeCount,
        username: user.username,
      })
      .from(template)
      .innerJoin(user, eq(template.userId, user.id))
      .innerJoin(topic, eq(template.topicId, topic.id));

    return templates;
  } catch (error) {
    console.error("ERROR_FETCHING_ALL_TEMPLATES", error);
    return [];
  }
};
