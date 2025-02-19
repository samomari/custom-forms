import ViewForm from "@/components/forms/view-form";
import { GetQA } from "@/features/answers/get-qa";
import { GetFormData } from "@/features/forms/get-form-data";
import { getUserRole } from "@/features/roles/get-user-role";
import { currentUser } from "@/features/users/current-user";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  const form = await GetFormData(id);
  const qa = await GetQA(id);

  if (!form) {
    redirect("/templates");
  }

  const isOwner = user?.id === form?.userId;
  const role = await getUserRole();
  const isEditor = isOwner || role === "ADMIN";
  return (
    <div className="h-full w-full flex justify-center pt-4">
      <ViewForm
        title={form.title}
        description={form.description}
        qa={qa}
        isEditor={isEditor}
      />
    </div>
  );
}
