import { db } from "@/drizzle";
import { topic } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetTopicName = async (topicId: string) => {
  try {
    const topicName = await db
      .select({
        name: topic.name,
      })
      .from(topic)
      .where(eq(topic.id, topicId))
      .limit(1);

    return topicName.length ? topicName[0] : null;
  } catch (error) {
    console.error("GET_TOPIC_ERROR", error);
    return null;
  }
};
