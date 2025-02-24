import { currentUser } from "@/features/users/current-user";
import { GetUserFilledForms } from "@/features/forms/get-user-filled-forms";
import { GetUserTemplates } from "@/features/templates/get-user-created-templates";
import { redirect } from "next/navigation";
import { formsTableColumns } from "@/components/forms/forms-table-collumns";
import { templatesTableColumns } from "@/components/templates/templates-table-collumns";
import Dashboard from "@/components/dashboard/dashboard";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Dashboard");
  const user = await currentUser();
  if (!user) redirect("/templates");

  const userForms = await GetUserFilledForms(user.id);
  const userTemplates = await GetUserTemplates(user.id);

  const tabs = [
    {
      value: "forms",
      label: t("formsTabLabel"),
      data: userForms,
      columns: formsTableColumns,
      emptyMessage: t("formsTabEmpty"),
      link: "/templates",
      linkText: t("formsTabLink"),
    },
    {
      value: "templates",
      label: t("templatesTabLabel"),
      data: userTemplates,
      columns: templatesTableColumns,
      emptyMessage: t("templatesTabEmpty"),
      link: "/templates/new",
      linkText: t("templatesTabLink"),
    },
  ];

  return <Dashboard tabs={tabs} />;
}
