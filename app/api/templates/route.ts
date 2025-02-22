import { db } from "@/drizzle";
import { privateTemplateAccess, question, template } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      topicId,
      imageUrl,
      isPublic,
      questions,
      selectedUsers,
    } = await req.json();
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    const newTemplate = await db
      .insert(template)
      .values({
        title,
        description,
        topicId,
        imageUrl,
        isPublic,
        userId: user.id,
      })
      .returning();

    if (newTemplate.length === 0 || !newTemplate[0]) {
      return new NextResponse("Failed to create template", { status: 500 });
    }

    const questionsData = questions.map(
      (q: {
        question: string;
        description: string;
        type: string;
        position: number;
      }) => ({
        content: q.question,
        description: q.description,
        type: q.type,
        position: q.position,
        templateId: newTemplate[0].id,
      }),
    );

    if (questionsData.length > 0) {
      await db.insert(question).values(questionsData);
    }

    if (!isPublic && selectedUsers?.length > 0) {
      const privateTemplateAccessData = selectedUsers.map((userId: string) => ({
        templateId: newTemplate[0].id,
        userId,
      }));
      await db.insert(privateTemplateAccess).values(privateTemplateAccessData);
    }

    return NextResponse.json(newTemplate[0]);
  } catch (error) {
    console.error("TEMPLATES_POST_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
