import { db } from "@/drizzle";
import { privateTemplateAccess, question, template } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { NextResponse } from "next/server";
import { eq, inArray, sql } from "drizzle-orm";

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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await currentUser();
    const {
      title,
      description,
      topicId,
      imageUrl,
      isPublic,
      questions,
      selectedUsers,
    } = await req.json();

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

    const updatedTemplate = await db
      .update(template)
      .set({
        title,
        description,
        topicId,
        imageUrl,
        isPublic,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(template.id, id))
      .returning();

    if (!updatedTemplate.length) {
      return NextResponse.json(
        { message: "Template was not updated" },
        { status: 404 },
      );
    }

    const existingQuestions = await db
      .select({
        id: question.id,
      })
      .from(question)
      .where(eq(question.templateId, id))
      .execute();

    const existingIds = new Set(existingQuestions.map((q) => q.id));
    const incomingIds = new Set(questions.map((q: { id: string }) => q.id));

    const toInsertIds = questions.filter(
      (q: { id: string }) => !existingIds.has(q.id),
    );

    const toUpdateIds = questions.filter((q: { id: string }) =>
      existingIds.has(q.id),
    );

    const toDeleteIds = [...existingIds].filter((id) => !incomingIds.has(id));

    if (toInsertIds.length) {
      const insertQuestions = toInsertIds.map(
        (q: { question: string; type: number; position: number }) => ({
          content: q.question,
          type: q.type,
          position: q.position,
          templateId: id,
        }),
      );
      await db.insert(question).values(insertQuestions);
    }

    if (toUpdateIds.length) {
      await Promise.all(
        toUpdateIds.map(
          (q: {
            id: string;
            question: string;
            type: number;
            position: number;
          }) =>
            db
              .update(question)
              .set({ content: q.question, type: q.type, position: q.position })
              .where(eq(question.id, q.id)),
        ),
      );
    }

    if (toDeleteIds.length) {
      await db.delete(question).where(inArray(question.id, toDeleteIds));
    }

    if (isPublic || !selectedUsers.length) {
      await db
        .delete(privateTemplateAccess)
        .where(eq(privateTemplateAccess.templateId, id));
    }

    console.log(isPublic);
    if (!isPublic && selectedUsers?.length > 0) {
      const existingUsers = await db
        .select({ userId: privateTemplateAccess.userId })
        .from(privateTemplateAccess)
        .where(eq(privateTemplateAccess.templateId, id))
        .execute();

      const existingUsersIds = new Set(existingUsers.map((u) => u.userId));
      const newUserIds = new Set(selectedUsers);

      const usersToDelete = existingUsers.filter(
        (u) => !newUserIds.has(u.userId),
      );
      console.log(existingUsersIds);
      console.log("selectedUsers:", selectedUsers);

      console.log(usersToDelete);
      if (usersToDelete.length) {
        await db.delete(privateTemplateAccess).where(
          inArray(
            privateTemplateAccess.userId,
            usersToDelete.map((u) => u.userId),
          ),
        );
      }

      const usersToInsert = selectedUsers.filter(
        (uid: string) => !existingUsersIds.has(uid),
      );
      if (usersToInsert.length) {
        const insertValues = usersToInsert.map((userId: string) => ({
          userId,
          templateId: id,
        }));
        await db.insert(privateTemplateAccess).values(insertValues);
      }
    }
    return NextResponse.json({ message: "Template updated" });
  } catch (error) {
    console.error("TEMPLATE_UPDATE_ERROR", error);
    return NextResponse.json(
      { message: "Failed to update template", error },
      { status: 500 },
    );
  }
}
