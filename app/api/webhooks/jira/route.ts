import axios from "axios";

const apiToken = process.env.JIRA_API_TOKEN;
const JIRA_DOMAIN = "https://custom-forms.atlassian.net";
const headers = {
  Authorization: `Basic ${Buffer.from(`marius.sam98@gmail.com:${apiToken}`).toString("base64")}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};
export async function POST(req: Request) {
  try {
    const issueResponse = await req.json();

    const email = issueResponse.issue.fields.description
      .split("mailto:")[1]
      .split("]")[0];

    const userResponse = await axios.post(
      `${JIRA_DOMAIN}/rest/api/2/user`,
      {
        emailAddress: email,
        products: [],
      },
      { headers },
    );

    const newUserAccountId = userResponse.data.accountId;
    const issueId = issueResponse.issue.id;
    await axios.put(
      `${JIRA_DOMAIN}/rest/api/2/issue/${issueId}`,
      {
        fields: {
          reporter: {
            accountId: newUserAccountId,
          },
        },
      },
      { headers },
    );

    return new Response(
      JSON.stringify({ message: "User created and issue updated!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(
      "Error:",
      // @ts-expect-error ignore
      error.response ? error.response.data : error.message,
    );
  }
}
