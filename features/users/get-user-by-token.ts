import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetUserByToken = async (token: string) => {
  try {
    const userData = await db
      .select({
        id: user.id,
      })
      .from(user)
      .where(eq(user.token, token))
      .limit(1);

    return userData[0];
  } catch (error) {
    console.error("ERROR_FETCHING_USER");
  }
};
