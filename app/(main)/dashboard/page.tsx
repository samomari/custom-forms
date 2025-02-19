import { currentUser } from "@/features/users/current-user";
import { GetUserFilledForms } from "@/features/forms/get-user-filled-forms";
import { GetUserTemplates } from "@/features/templates/get-user-created-templates";
import { redirect } from "next/navigation";
import { formsTableColumns } from "@/components/forms/forms-table-collumns";
import { templatesTableColumns } from "@/components/templates/templates-table-collumns";
import Dashboard from "@/components/dashboard/dashboard";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/templates");

  const userForms = await GetUserFilledForms(user.id);
  const userTemplates = await GetUserTemplates(user.id);

  const tabs = [
    {
      value: "forms",
      label: "Forms",
      data: userForms,
      columns: formsTableColumns,
      emptyMessage: "You have not filled any forms yet.",
      link: "/templates",
      linkText: "Browse Templates",
    },
    {
      value: "templates",
      label: "Templates",
      data: userTemplates,
      columns: templatesTableColumns,
      emptyMessage: "You have not created any templates yet.",
      link: "/templates/new",
      linkText: "Create Template",
    },
  ];

  return <Dashboard tabs={tabs} />;
}
