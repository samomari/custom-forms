import CreateForm from "@/components/forms/create-form";
import { GetTemplateQuestions } from "@/features/questions/get-template-questions";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;

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
      <CreateForm template={template} questions={questions} />
    </div>
  );
}
