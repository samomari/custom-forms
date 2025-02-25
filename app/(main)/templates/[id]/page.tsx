import ViewTemplate from "@/components/templates/view-template";
import { currentUser } from "@/features/users/current-user";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { GetTemplateQuestions } from "@/features/questions/get-template-questions";
import { redirect } from "next/navigation";
import { getUserRole } from "@/features/roles/get-user-role";
import { GetTopicName } from "@/features/topics/get-topic-name";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();

  const template = await GetTemplateData(id);
  const questions = await GetTemplateQuestions(id);
  const topicName = await GetTopicName(id);

  if (!template) {
    redirect("/templates");
  }

  const isOwner = user?.id === template?.userId;
  const role = await getUserRole();
  const isEditor = isOwner || role === "ADMIN";

  return (
    <div className="h-full w-full flex justify-center pt-4 ">
      {template && (
        <ViewTemplate
          id={id}
          title={template.title}
          description={template.description}
          likeCount={template.likeCount}
          formCount={template.formCount}
          questions={questions}
          isEditor={isEditor}
          user={user}
          topicName={topicName}
        />
      )}
    </div>
  );
}
