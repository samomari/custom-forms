import { db } from "@/drizzle";
import { like, template, user } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import { clerkClient } from "@clerk/nextjs/server";
import { eq, inArray, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
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
    if (!id) {
      return NextResponse.json({ message: "userIdMissing" }, { status: 400 });
    }

    const isAdmin = activeUser.role === "ADMIN";

    if (!isAdmin) {
      return NextResponse.json(
        { message: "unauthorizedForThisAction" },
        { status: 403 },
      );
    }

    const userStatus = await db
      .select({ status: user.status })
      .from(user)
      .where(eq(user.id, id));

    if (userStatus.length === 0) {
      return NextResponse.json({ message: "userNotFound" }, { status: 404 });
    }

    const client = await clerkClient();

    if (userStatus[0].status === "BLOCKED") {
      await client.users.unbanUser(id);
      await db
        .update(user)
        .set({ status: "ACTIVE", updatedAt: sql`CURRENT_TIMESTAMP` })
        .where(eq(user.id, id))
        .returning();
      return NextResponse.json({ message: "userUnblock" });
    }

    await client.users.banUser(id);

    await db
      .update(user)
      .set({ status: "BLOCKED", updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(user.id, id))
      .returning();
    return NextResponse.json({ message: "userBlock" });
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { role } = await req.json();

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

    if (!role) {
      return NextResponse.json({ message: "missingRole" }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ message: "userIdMissing" }, { status: 400 });
    }

    const isAdmin = activeUser.role === "ADMIN";

    if (!isAdmin) {
      return NextResponse.json(
        { message: "unauthorizedForThisAction" },
        { status: 403 },
      );
    }

    const updatedUser = await db
      .update(user)
      .set({
        role: role,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(user.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ message: "userNotFound" }, { status: 404 });
    }

    return NextResponse.json({
      message: "userRoleUpdated",
    });
  } catch (error) {
    console.error("ROLE_CHANGE_ERROR", error);
    return NextResponse.json({ message: "internalError" }, { status: 500 });
  }
}

export async function DELETE(
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
    if (!id) {
      return NextResponse.json({ message: "userIdMissing" }, { status: 400 });
    }

    const isAdmin = activeUser.role === "ADMIN";

    if (!isAdmin) {
      return NextResponse.json(
        { message: "unauthorizedForThisAction" },
        { status: 403 },
      );
    }

    const client = await clerkClient();
    let clerkUser;
    try {
      clerkUser = await client.users.getUser(id);
    } catch (error) {
      // @ts-expect-error ignore
      if (error.status === 404) {
        console.error(`User with ID ${id} already deleted from Clerk.`);
      }
    }

    if (clerkUser) {
      await client.users.deleteUser(id);
    }

    const hasLiked = await db
      .select({ templateId: like.templateId })
      .from(like)
      .where(eq(like.userId, id));

    if (hasLiked.length > 0) {
      const likedTemplates = hasLiked.map((l) => l.templateId);

      await db
        .update(template)
        .set({ likeCount: sql`${template.likeCount} -1` })
        .where(inArray(template.id, likedTemplates));
    }

    await db.delete(user).where(eq(user.id, id));

    return NextResponse.json({ message: "userDelete" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "internalError" }, { status: 500 });
  }
}
