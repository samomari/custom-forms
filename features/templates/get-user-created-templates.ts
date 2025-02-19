import { db } from "@/drizzle";
import { template } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetUserTemplates = async (userId: string) => {
  try {
    const userTemplates = await db
      .select({
        id: template.id,
        updatedAt: template.updatedAt,
        title: template.title,
      })
      .from(template)
      .where(eq(template.userId, userId));

    return userTemplates;
  } catch (error) {
    console.error("ERROR_FETCHING_USER_TEMPLATES", error);
    return [];
  }
};
