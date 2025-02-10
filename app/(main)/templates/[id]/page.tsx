import ViewTemplate from "@/components/templates/view-template-form";
import { currentUser } from "@/features/users/current-user";
import { fakeTemplates } from "@/features/fakeTemplates";
interface TemplatePageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: TemplatePageProps) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    console.log("You must be logged in to view this page");
  }

  const template = fakeTemplates.find((t) => t.id === id);

  if (!template) {
    console.log("Template not found");
  }

  const isOwner = user?.id === template?.userId;
  const isAdmin = user?.role === "ADMIN";
  const isEditor = isOwner || isAdmin;

  return (
    <div className="h-full w-full flex justify-center pt-4">
      {template && (
        <ViewTemplate
          id={template.id}
          title={template.title}
          description={template.description}
          likeCount={template.likeCount}
          questions={template.questions}
          isEditor={isEditor}
          user={user}
        />
      )}
    </div>
  );
}
