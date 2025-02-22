import { db } from "@/drizzle";
import { like, template } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, templateId } = await req.json();
    const user = await currentUser();

    if (!userId || !templateId) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.status === "BLOCKED") {
      return NextResponse.json(
        {
          message:
            "Your account has been blocked, please contact administration.",
        },
        { status: 403 },
      );
    }

    const isLiked = await db
      .select()
      .from(like)
      .where(and(eq(like.templateId, templateId), eq(like.userId, userId)))
      .limit(1);

    if (isLiked.length) {
      return NextResponse.json(
        { message: "You can like template only once" },
        { status: 400 },
      );
    }

    await db.insert(like).values({ templateId, userId });

    await db
      .update(template)
      .set({
        likeCount: sql`${template.likeCount} + 1`,
      })
      .where(eq(template.id, templateId));

    return NextResponse.json({
      message: "Like submitted",
    });
  } catch (error) {
    console.error("ERROR_ADDING_LIKE", error);
    return NextResponse.json({ message: "Error adding like" }, { status: 500 });
  }
}
