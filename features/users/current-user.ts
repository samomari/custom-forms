import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const currentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const currentUser = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return currentUser.length > 0 ? currentUser[0] : null;
}