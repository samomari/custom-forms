import ViewTemplate from "@/components/templates/view-template-form";
import { currentUser } from "@/features/users/current-user";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { GetTemplateQuestions } from "@/features/questions/get-template-questions";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();

  const template = await GetTemplateData(id);
  const questions = await GetTemplateQuestions(id);

  if (!template) {
    return redirect("/templates");
  }

  const isOwner = user?.id === template?.userId;
  const isAdmin = user?.role === "ADMIN";
  const isEditor = isOwner || isAdmin;

  return (
    <div className="h-full w-full flex justify-center pt-4">
      {template && (
        <ViewTemplate
          id={id}
          title={template.title}
          description={template.description}
          likeCount={template.likeCount}
          questions={questions}
          isEditor={isEditor}
          user={user}
        />
      )}
    </div>
  );
}
