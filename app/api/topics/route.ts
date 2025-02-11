import { db } from "@/drizzle";
import { topic } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await db.select().from(topic);
    return NextResponse.json(topics);
  } catch (error) {
    console.log("GET_TOPICS_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
