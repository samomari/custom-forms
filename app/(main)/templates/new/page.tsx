import CreateTemplateForm from "@/components/templates/create-template-form";
import { GetTopics } from "@/features/topics/get-topics";
import { GetAllUsers } from "@/features/users/get-all-users";

export default async function Page() {
  const users = await GetAllUsers();
  const topics = await GetTopics();
  return (
    <div className="w-full h-full flex justify-center pt-4">
      <CreateTemplateForm users={users} topics={topics} />
    </div>
  );
}
