import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";

export const GetAllUsers = async () => {
  try {
    const activeUser = await currentUser();
    if (!activeUser) {
      throw new Error("Unauthorized");
    }
    const users = await db
      .select({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
      })
      .from(user);

    const filteredUsers = users.filter((u) => u.id !== activeUser.id);
    return filteredUsers;
  } catch (error) {
    console.error("GET_USERS_ERROR", error);
    return [];
  }
};
