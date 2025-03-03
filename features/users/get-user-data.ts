import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetUserData = async (userId: string) => {
  try {
    const userData = await db
      .select({
        id: user.id,
        email: user.email,
        username: user.username,
        sfAccountId: user.sfAccountId,
        token: user.token,
        role: user.role,
        status: user.status,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    return userData.length > 0 ? userData[0] : undefined;
  } catch (error) {
    console.error("ERROR_RETRIEVING_USER_DATA", error);
    return undefined;
  }
};
