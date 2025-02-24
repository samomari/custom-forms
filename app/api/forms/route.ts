import { db } from "@/drizzle";
import { answer, form, template } from "@/drizzle/schema";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { currentUser } from "@/features/users/current-user";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { templateId, answers } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    if (user.status === "BLOCKED") {
      return NextResponse.json(
        {
          message: "blocked",
        },
        { status: 403 },
      );
    }

    const templateData = await GetTemplateData(templateId);
    if (!templateData) {
      return NextResponse.json(
        { message: "templateNotFound" },
        { status: 404 },
      );
    }

    const newForm = await db
      .insert(form)
      .values({
        userId: user.id,
        templateId,
      })
      .returning();

    if (newForm.length === 0 || !newForm[0]) {
      return NextResponse.json(
        { message: "failedToCreateForm" },
        { status: 500 },
      );
    }

    const answersData = answers.map(
      (a: { answer: string; questionId: string }) => ({
        value: a.answer,
        questionId: a.questionId,
        formId: newForm[0].id,
      }),
    );

    if (answersData.length > 0) {
      await db.insert(answer).values(answersData);
    }

    await db
      .update(template)
      .set({ formCount: sql`${template.formCount} +1` })
      .where(eq(template.id, templateId));

    return NextResponse.json({
      form: newForm[0],
      message: "formSubmitted",
    });
  } catch (error) {
    console.error("FORM_POST_ERROR", error);
    return NextResponse.json({ message: "internalError" }, { status: 500 });
  }
}
