import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { currentUser } from "@/features/users/current-user";
import axios from "axios";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const domain = process.env.SALESFORCE_DOMAIN;
const tokenUrl = process.env.SALESFORCE_TOKEN_URL!;
const clientId = process.env.SALESFORCE_CLIENT_ID!;
const clientSecret = process.env.SALESFORCE_CLIENT_SECRET!;

async function getOAuthToken() {
  try {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(tokenUrl, params);

    if (!response.data.access_token) {
      throw new Error("OAuth token not received");
    }

    return response.data.access_token;
  } catch (error) {
    console.error("Salesforce OAuth Token Error:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      website,
      industry,
      title,
      username,
      userId,
    } = await req.json();

    const activeUser = await currentUser();
    if (
      !activeUser ||
      activeUser.status === "BLOCKED" ||
      (activeUser.id !== userId && activeUser.role !== "ADMIN")
    ) {
      return NextResponse.json(
        {
          message:
            activeUser?.status === "BLOCKED"
              ? "blocked"
              : "unauthorizedForThisAction",
        },
        { status: 403 },
      );
    }

    if (!firstName || !lastName || !userId || !username || !email) {
      return NextResponse.json({ message: "missingData" }, { status: 400 });
    }

    const accessToken = await getOAuthToken();
    if (!accessToken) {
      return NextResponse.json(
        { message: "failedToGetToken" },
        { status: 500 },
      );
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const accountUrl = `${domain}Account/`;
    const contactUrl = `${domain}Contact/`;

    const accountResponse = await axios.post(
      accountUrl,
      {
        Name: username,
        Phone: phone,
        Website: website,
        Industry: industry,
      },
      { headers },
    );

    if (!accountResponse.data.id) {
      return NextResponse.json({ error: "failedSfAcc" }, { status: 500 });
    }

    const accountId = accountResponse.data.id;

    const contactResponse = await axios.post(
      contactUrl,
      {
        AccountId: accountId,
        LastName: `${firstName} ${lastName}`,
        Phone: phone,
        Email: email,
        Title: title,
      },
      { headers },
    );

    if (!contactResponse.data.id) {
      return NextResponse.json({ error: "failedSfCon" }, { status: 500 });
    }

    await db
      .update(user)
      .set({ sfAccountId: accountId, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(user.id, userId))
      .returning();

    return NextResponse.json({
      message: "successSf",
    });
  } catch (error) {
    console.error("SALESFORCE_INTERGRATION_ERROR", error);
    return NextResponse.json({ message: "internalError" }, { status: 500 });
  }
}
