import { db } from "@/drizzle";
import { template } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { message: "Template ID Missing" },
        { status: 400 },
      );
    }

    const templateExists = await db
      .select({ userId: template.userId })
      .from(template)
      .where(eq(template.id, id))
      .limit(1)
      .execute();

    if (templateExists.length === 0) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 },
      );
    }

    const isAdmin = user.role === "ADMIN";
    const isOwner = templateExists[0].userId === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { message: "Unauthorized for this action" },
        { status: 403 },
      );
    }

    await db.delete(template).where(eq(template.id, id));

    return NextResponse.json({
      message: "Template deleted",
    });
  } catch (error) {
    console.error("TEMPLATE_DELETE_ERROR", error);
    return NextResponse.json(
      { message: "Failed to delete template", error },
      { status: 500 },
    );
  }
}
