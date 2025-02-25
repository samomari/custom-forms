import FormsList from "@/components/forms/forms-list";
import { GetTemplateForms } from "@/features/forms/get-template-forms";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { currentUser } from "@/features/users/current-user";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations();
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    redirect(`/templates/${id}`);
  }
  const template = await GetTemplateData(id);
  const forms = await GetTemplateForms(id);
  if (forms.length === 0) {
    redirect("/templates");
  }
  return (
    <div className="h-full w-full flex flex-col items-center pt-4 ">
      <h1 className="text-2xl font-bold text-center mb-4">
        {t("Form.formsCreated", { title: template?.title })}
      </h1>
      <FormsList forms={forms} />
    </div>
  );
}
