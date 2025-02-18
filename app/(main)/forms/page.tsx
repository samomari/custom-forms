import { GetUserFilledForms } from "@/features/forms/get-user-filled-forms";
import { currentUser } from "@/features/users/current-user";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/forms/forms-table-collumns";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/templates");
  }

  const userForms = await GetUserFilledForms(user.id);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-6">
        <DataTable columns={columns} data={userForms} />
      </div>
    </div>
  );
}
