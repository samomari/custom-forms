import { GetUserFilledForms } from "@/features/forms/get-user-filled-forms";
import { currentUser } from "@/features/users/current-user";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { formsTableColumns } from "@/components/forms/forms-table-collumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetUserTemplates } from "@/features/templates/get-user-created-templates";
import { templatesTableColumns } from "@/components/templates/templates-table-collumns";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/templates");
  }

  const userForms = await GetUserFilledForms(user.id);
  const userTemplates = await GetUserTemplates(user.id);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-6">
        <Tabs defaultValue="forms">
          <div className="flex items-center justify-between space-x-4">
            <TabsList className="flex space-x-4">
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="forms">
            {userForms.length > 0 ? (
              <DataTable columns={formsTableColumns} data={userForms} />
            ) : (
              <div className="text-center py-6">
                <p>
                  You have not filled any forms yet.
                  <Link href="/templates">
                    <Button variant="link">Browse Templates</Button>
                  </Link>
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="templates">
            {userTemplates.length > 0 ? (
              <DataTable columns={templatesTableColumns} data={userTemplates} />
            ) : (
              <div className="text-center py-6">
                <p>
                  You have not created any templates yet.
                  <Link href="/templates/new">
                    <Button variant="link">Create template</Button>
                  </Link>
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
