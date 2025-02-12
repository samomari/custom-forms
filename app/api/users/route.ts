import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { NextResponse } from "next/server";

// eslint-disable-next-line
export async function GET(req: Request) {
  try {
    const activeUser = await currentUser();
    if (!activeUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const users = await db.select().from(user);
    const filteredUsers = users.filter((u) => u.id !== activeUser.id);
    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.log("GET_USERS_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
