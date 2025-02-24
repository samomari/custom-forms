import { db } from "@/drizzle";
import { template, topic } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetTopicName = async (templateId: string) => {
  try {
    const topicName = await db
      .select({
        name: topic.name,
      })
      .from(template)
      .innerJoin(topic, eq(template.topicId, topic.id))
      .where(eq(template.id, templateId))
      .limit(1);

    return topicName.length ? topicName[0].name : "";
  } catch (error) {
    console.error("GET_TOPIC_ERROR", error);
    return "";
  }
};
