import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const activeUser = await currentUser();

    if (!activeUser) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    if (activeUser.status === "BLOCKED") {
      return NextResponse.json(
        {
          message: "blocked",
        },
        { status: 403 },
      );
    }

    if (activeUser.id !== id && activeUser.role !== "ADMIN") {
      return NextResponse.json(
        { message: "unauthorizedForThisAction" },
        { status: 403 },
      );
    }

    const jwtToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });

    const updatedUser = await db
      .update(user)
      .set({ token: jwtToken, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(user.id, id))
      .returning();

    return NextResponse.json({
      user: updatedUser[0],
      message: "User token created",
    });
  } catch (error) {
    console.error("CREATE_USER_TOKEN_ERROR", error);
    return new NextResponse("internalError", { status: 500 });
  }
}
