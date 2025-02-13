import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    const { id, email_addresses, username } = evt.data;

    if (!id || !email_addresses || !username) {
      return new Response("Error occured -- missing data", {
        status: 400,
      });
    }

    await db
      .insert(user)
      .values({
        id,
        email: email_addresses[0].email_address,
        username,
        role: "USER",
        status: "ACTIVE",
      })
      .returning();
  }

  if (evt.type === "user.updated") {
    const { id, username } = evt.data;

    if (!id || !username) {
      return new Response("Error occured -- missing data", {
        status: 400,
      });
    }

    const existingUser = await db
      .select({ username: user.username })
      .from(user)
      .where(eq(user.id, id))
      .limit(1)
      .execute();

    if (!existingUser.length) {
      return new Response("User not found", { status: 404 });
    }

    if (existingUser[0].username !== username) {
      await db
        .update(user)
        .set({
          username: username,
        })
        .where(eq(user.id, id))
        .execute();

      console.log("user updated");
    }
  }

  if (evt.type === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error occured -- missing user id", {
        status: 400,
      });
    }

    await db.delete(user).where(eq(user.id, id)).execute();
  }

  return new Response("Webhook received", { status: 200 });
}
