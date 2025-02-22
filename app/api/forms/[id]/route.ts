import { db } from "@/drizzle";
import { answer, form, template } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

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

    if (user.status === "BLOCKED") {
      return NextResponse.json(
        {
          message:
            "Your account has been blocked, please contact administration.",
        },
        { status: 403 },
      );
    }

    if (!id) {
      return NextResponse.json({ message: "Form ID Missing" }, { status: 400 });
    }

    const formExists = await db
      .select({ userId: form.userId, templateId: form.templateId })
      .from(form)
      .where(eq(form.id, id))
      .execute();

    if (formExists.length === 0) {
      return NextResponse.json(
        {
          message: "Form not found",
        },
        { status: 404 },
      );
    }

    const isAdmin = user.role === "ADMIN";
    const isOwner = formExists[0].userId === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { message: "Unauthorized for this action" },
        { status: 403 },
      );
    }

    await db.delete(form).where(eq(form.id, id));

    await db
      .update(template)
      .set({ formCount: sql`${template.formCount} -1` })
      .where(eq(template.id, formExists[0].templateId));

    return NextResponse.json({
      message: "Form deleted",
    });
  } catch (error) {
    console.error("FORM_DELETE_ERROR", error);
    return NextResponse.json(
      { error: "Failed to delete form" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await currentUser();
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
      { message: "Failed to update form" },
      { status: 500 },
    );
  }
}
