import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export const initialUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.id, clerkUser.id))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  const newUser = await db
    .insert(user)
    .values({
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: `${clerkUser.username}`,
      role: "USER",
      status: "ACTIVE"
    })
    .returning();

  return newUser[0];
}