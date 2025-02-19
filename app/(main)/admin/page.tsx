import { currentUser } from "@/features/users/current-user";
import { GetAllUsers } from "@/features/users/get-all-users";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";
import { allUsersColumns } from "@/components/admin/all-users-columns";
import { GetAllForms } from "@/features/forms/get-all-forms";
import { GetAllTemplates } from "@/features/templates/get-all-templates";
import { allFormsColumns } from "@/components/admin/all-forms-columns";
import { allTemplatesColumns } from "@/components/admin/all-templates-columns";

export default async function Page() {
  const user = await currentUser();
  if (!user || !(user.role === "ADMIN")) redirect("/templates");

  const allForms = await GetAllForms();
  const allTemplates = await GetAllTemplates();
  const allUsers = await GetAllUsers();

  const tabs = [
    {
      value: "forms",
      label: "Forms",
      data: allForms,
      columns: allFormsColumns,
      emptyMessage: "There is no any forms yet.",
      link: "/templates",
      linkText: "Browse Templates",
    },
    {
      value: "templates",
      label: "Templates",
      data: allTemplates,
      columns: allTemplatesColumns,
      emptyMessage: "There is no any templates yet.",
      link: "/templates/new",
      linkText: "Create Template",
    },
    {
      value: "users",
      label: "Users",
      data: allUsers,
      columns: allUsersColumns,
      emptyMessage: "No users found.",
      link: null,
      linkText: null,
    },
  ];

  return <Dashboard tabs={tabs} />;
}
