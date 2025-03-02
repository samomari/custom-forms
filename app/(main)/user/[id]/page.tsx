import { currentUser } from "@/features/users/current-user";
import { GetUserFilledForms } from "@/features/forms/get-user-filled-forms";
import { GetUserTemplates } from "@/features/templates/get-user-created-templates";
import { redirect } from "next/navigation";
import { formsTableColumns } from "@/components/forms/forms-table-collumns";
import { templatesTableColumns } from "@/components/templates/templates-table-collumns";
import Dashboard from "@/components/dashboard/dashboard";
import { getTranslations } from "next-intl/server";
import { GetUserData } from "@/features/users/get-user-data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Dashboard");
  const user = await currentUser();
  if (user?.id !== id && user?.role !== "ADMIN") redirect("/templates");
  const userData = await GetUserData(id);

  const userForms = await GetUserFilledForms(id);
  const userTemplates = await GetUserTemplates(id);

  const tabs = [
    {
      value: "forms",
      label: t("userFormsTabLabel"),
      data: userForms,
      columns: formsTableColumns,
      emptyMessage: t("userFormsTabEmpty"),
      link: "/templates",
      linkText: t("formsTabLink"),
    },
    {
      value: "templates",
      label: t("userTemplatesTabLabel"),
      data: userTemplates,
      columns: templatesTableColumns,
      emptyMessage: t("userTemplatesTabEmpty"),
      link: "/templates/new",
      linkText: t("templatesTabLink"),
    },
  ];

  return <Dashboard tabs={tabs} user={userData} />;
}
