import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle";
import { answer, form, question, template, user } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { ResponseTypes } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new NextResponse(
        JSON.stringify({
          error: "Authorization token is required",
        }),
        { status: 401 },
      );
    }

    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 403 },
      );
    }

    const userId = decodedToken.id;

    const aggregatedData = await getAggregatedResults(userId);

    return new NextResponse(JSON.stringify(aggregatedData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while fetching data",
      }),
      { status: 500 },
    );
  }
}

async function fetchTemplates(userId: string) {
  return db
    .select({
      id: template.id,
      title: template.title,
      authorName: user.username,
    })
    .from(template)
    .innerJoin(user, eq(template.userId, user.id))
    .where(eq(template.userId, userId));
}

async function getAggregatedResults(userId: string) {
  const templates = await fetchTemplates(userId);
  if (!templates.length) return [];

  const templatesIds = templates.map((t) => t.id);

  const forms = await db
    .select({ id: form.id, templateId: form.templateId })
    .from(form)
    .where(inArray(form.templateId, templatesIds));

  const formsIds = forms.map((f) => f.id);

  const answers = await db
    .select()
    .from(answer)
    .where(inArray(answer.formId, formsIds));

  const questions = await db
    .select()
    .from(question)
    .where(inArray(question.templateId, templatesIds));

  const questionAggregates: any = {};

  for (const answerRecord of answers) {
    const { questionId, value } = answerRecord;
    const questionData = questions.find((q) => q.id === questionId);
    if (!questionData) continue;

    const { type, content } = questionData;
    const typeLabel = ResponseTypes[type].label.toUpperCase();

    questionAggregates[questionId] = questionAggregates[questionId] || {
      content,
      type: typeLabel,
      totalAnswers: 0,
    };

    questionAggregates[questionId].totalAnswers += 1;

    if (type === 2) {
      questionAggregates[questionId].sum =
        (questionAggregates[questionId].sum || 0) + parseInt(value);
      questionAggregates[questionId].min = Math.min(
        questionAggregates[questionId].min ?? Infinity,
        parseInt(value),
      );
      questionAggregates[questionId].max = Math.max(
        questionAggregates[questionId].max ?? -Infinity,
        parseInt(value),
      );
    } else if (type === 0 || type === 1) {
      questionAggregates[questionId].answers =
        questionAggregates[questionId].answers || {};
      questionAggregates[questionId].answers[value] =
        (questionAggregates[questionId].answers[value] || 0) + 1;
    } else if (type === 3) {
      questionAggregates[questionId].checked =
        (questionAggregates[questionId].checked || 0) +
        (value === "true" ? 1 : 0);
    }
  }

  return templates.map((template) => {
    return {
      templateId: template.id,
      title: template.title,
      author: template.authorName,
      questions: questions
        .filter((q) => q.templateId === template.id)
        .map((q) => {
          const aggregate = questionAggregates[q.id] || { totalAnswers: 0 };
          const typeLabel = ResponseTypes[q.type].label.toUpperCase();
          if (q.type === 2) {
            return {
              id: q.id,
              text: q.content,
              type: typeLabel,
              totalAnswers: aggregate.totalAnswers,
              min: aggregate.min,
              max: aggregate.max,
              average: aggregate.sum
                ? aggregate.sum / aggregate.totalAnswers
                : null,
            };
          } else if (q.type === 3) {
            return {
              id: q.id,
              text: q.content,
              type: typeLabel,
              totalAnswers: aggregate.totalAnswers,
              checkedPercentage: aggregate.checked
                ? (aggregate.checked / aggregate.totalAnswers) * 100
                : 0,
            };
          } else {
            const mostFrequentAnswer = aggregate.answers
              ? Object.keys(aggregate.answers).reduce((a, b) =>
                  aggregate.answers[a] > aggregate.answers[b] ? a : b,
                )
              : null;
            return {
              id: q.id,
              text: q.content,
              type: typeLabel,
              totalAnswers: aggregate.totalAnswers,
              mostFrequentAnswer,
            };
          }
        }),
    };
  });
}

async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}
