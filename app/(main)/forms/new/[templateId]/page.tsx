import CreateFormForm from "@/components/forms/create-form-form";
import { GetTemplateQuestions } from "@/features/questions/get-template-questions";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { currentUser } from "@/features/users/current-user";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const user = await currentUser();
  if (!user) {
    return redirect(`/templates/${templateId}`);
  }

  const template = await GetTemplateData(templateId);
  if (!template) {
    redirect("/templates");
  }
  const questions = await GetTemplateQuestions(templateId);
  if (questions.length === 0) {
    redirect(`/`);
  }
  return (
    <div className="w-full h-full flex justify-center pt-4">
      <CreateFormForm user={user} template={template} questions={questions} />
    </div>
  );
}
