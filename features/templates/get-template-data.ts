import { db } from "@/drizzle";
import { template } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetTemplateData = async (templateId: string) => {
  try {
    const templateData = await db
      .select({
        id: template.id,
        userId: template.userId,
        title: template.title,
        description: template.description,
        topicId: template.topicId,
        imageUrl: template.imageUrl,
        likeCount: template.likeCount,
      })
      .from(template)
      .where(eq(template.id, templateId))
      .limit(1);

    return templateData.length > 0 ? templateData[0] : null;
  } catch (error) {
    console.error("ERROR_FETCHING_TEMPLATE_DATA", error);
  }
};
