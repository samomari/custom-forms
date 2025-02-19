import EditForm from "@/components/forms/edit-form";
import { GetFormData } from "@/features/forms/get-form-data";
import { GetQA } from "@/features/forms/get-qa";
import { currentUser } from "@/features/users/current-user";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await currentUser();
  if (!user) {
    redirect(`/templates/${id}`);
  }

  const form = await GetFormData(id);
  if (!form) {
    redirect("/templates");
  }

  if (form.userId !== user.id && user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const qa = await GetQA(id);

  return (
    <div className="w-full h-full flex justify-center pt-4">
      <EditForm
        id={id}
        title={form.title}
        description={form.description}
        qa={qa}
      />
    </div>
  );
}
