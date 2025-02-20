import { db } from "@/drizzle";
import { answer, form } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;

    const { answers } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Form ID Missing" }, { status: 400 });
    }

    const formExists = await db
      .select({ userId: form.userId })
      .from(form)
      .where(eq(form.id, id))
      .execute();

    if (formExists.length === 0) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    const isAdmin = user.role === "ADMIN";
    const isOwner = formExists[0].userId === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { message: "Unauthorized for this action" },
        { status: 403 },
      );
    }

    const updatedForm = await db
      .update(form)
      .set({
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(form.id, id))
      .returning();

    if (!updatedForm.length) {
      return NextResponse.json(
        { message: "Form was not updated" },
        { status: 409 },
      );
    }

    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { message: "No answers provided" },
        { status: 400 },
      );
    }

    await Promise.all(
      answers.map((a: { answerId: string; answer: string }) =>
        db
          .update(answer)
          .set({ value: a.answer })
          .where(eq(answer.id, a.answerId))
          .returning(),
      ),
    );

    return NextResponse.json(
      {
        message: "Form updated succesfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("FORM_UPDATE_ERROR", error);
    return NextResponse.json(
      { message: "Failed to update template" },
      { status: 500 },
    );
  }
}
