import { db } from "@/drizzle";
import { topic } from "@/drizzle/schema";

export const GetTopics = async () => {
  try {
    const topics = await db
      .select({ id: topic.id, name: topic.name })
      .from(topic);

    return topics;
  } catch (error) {
    console.error("GET_TOPICS_ERROR", error);
    return [];
  }
};
