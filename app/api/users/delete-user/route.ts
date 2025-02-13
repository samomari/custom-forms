import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const userId = await req.json();

  try {
    const client = await clerkClient();
    await client.users.deleteUser(userId);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting user" });
  }
}
