import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const activeUser = await currentUser();
    if (!activeUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!id) {
      return NextResponse.json({ message: "User ID Missing" }, { status: 400 });
    }

    const isAdmin = activeUser.role === "ADMIN";

    if (!isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized for this action" },
        { status: 403 },
      );
    }

    const client = await clerkClient();
    await client.users.deleteUser(id);
    await db.delete(user).where(eq(user.id, id));
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting user" });
  }
}
