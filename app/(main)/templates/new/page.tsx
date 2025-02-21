import CreateTemplate from "@/components/templates/create-template";
import { GetTopics } from "@/features/topics/get-topics";
import { GetAllUsers } from "@/features/users/get-all-users";
export const dynamic = "force-dynamic";

export default async function Page() {
  const users = await GetAllUsers();
  const topics = await GetTopics();
  return (
    <div className="w-full h-full flex justify-center pt-4">
      <CreateTemplate users={users} topics={topics} />
    </div>
  );
}
