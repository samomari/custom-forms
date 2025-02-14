import { db } from "@/drizzle";
import { privateTemplateAccess, user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetUsersWithAccess = async (templateId: string) => {
  try {
    const allowedUsers = await db
      .select({
        id: user.id,
      })
      .from(user)
      .innerJoin(
        privateTemplateAccess,
        eq(user.id, privateTemplateAccess.userId),
      )
      .where(eq(privateTemplateAccess.templateId, templateId));

    return allowedUsers;
  } catch (error) {
    console.error("ERROR_FETCHING_USERS_WITH_ACCESS", error);
    return [];
  }
};
