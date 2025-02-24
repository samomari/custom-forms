import { currentUser } from "@/features/users/current-user";
import { GetAllUsers } from "@/features/users/get-all-users";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";
import { allUsersColumns } from "@/components/admin/all-users-columns";
import { GetAllForms } from "@/features/forms/get-all-forms";
import { GetAllTemplates } from "@/features/templates/get-all-templates";
import { allFormsColumns } from "@/components/admin/all-forms-columns";
import { allTemplatesColumns } from "@/components/admin/all-templates-columns";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Dashboard");
  const user = await currentUser();
  if (!user || !(user.role === "ADMIN")) redirect("/templates");

  const allForms = await GetAllForms();
  const allTemplates = await GetAllTemplates();
  const allUsers = await GetAllUsers();

  const tabs = [
    {
      value: "forms",
      label: t("formsTabLabel"),
      data: allForms,
      columns: allFormsColumns,
      emptyMessage: t("formsTabEmpty"),
      link: "/templates",
      linkText: t("formsTabLink"),
    },
    {
      value: "templates",
      label: t("templatesTabLabel"),
      data: allTemplates,
      columns: allTemplatesColumns,
      emptyMessage: t("templatesTabEmpty"),
      link: "/templates/new",
      linkText: t("templatesTabLink"),
    },
    {
      value: "users",
      label: t("usersTabLabel"),
      data: allUsers,
      columns: allUsersColumns,
      emptyMessage: t("userTabEmpty"),
      link: null,
      linkText: null,
    },
  ];

  return <Dashboard tabs={tabs} />;
}
