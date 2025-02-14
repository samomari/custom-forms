import EditTemplateForm from "@/components/templates/edit-template-form";
import { GetTemplateQuestions } from "@/features/questions/get-template-questions";
import { GetTemplateData } from "@/features/templates/get-template-data";
import { GetUsersWithAccess } from "@/features/templates/get-users-with-access";
import { GetTopics } from "@/features/topics/get-topics";
import { currentUser } from "@/features/users/current-user";
import { GetAllUsers } from "@/features/users/get-all-users";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    return redirect(`/templates/${id}`);
  }
  const template = await GetTemplateData(id);
  if (!template) {
    redirect("/templates");
  }
  if (template.userId !== user.id && user.role !== "ADMIN") {
    return redirect(`/templates/${id}`);
  }
  const questions = await GetTemplateQuestions(id);
  const allowedUsers = await GetUsersWithAccess(id);
  const users = await GetAllUsers();
  const topics = await GetTopics();
  return (
    <div className="w-full h-full flex justify-center pt-4">
      <EditTemplateForm
        template={template}
        questions={questions}
        users={users}
        allowedUsers={allowedUsers}
        topics={topics}
      />
    </div>
  );
}
