import { db } from "@/drizzle";
import { template } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const GetPopularTemplates = async () => {
  try {
    const templates = await db
      .select({
        id: template.id,
        title: template.title,
        description: template.description,
        imageUrl: template.imageUrl,
      })
      .from(template)
      .where(eq(template.isPublic, true))
      .orderBy(desc(template.formCount))
      .limit(5);

    return templates;
  } catch (error) {
    console.error("ERROR_FETCHING_POPULAR_TEMPLATES:", error);
    return [];
  }
};
