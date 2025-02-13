import TemplatesGallery from "@/components/templates/template-gallery";
import { GetAvailableTemplates } from "@/features/templates/get-available-templates";

export default async function Page() {
  const templates = await GetAvailableTemplates();
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          All templates available to you
        </h1>
        <TemplatesGallery templates={templates} />
      </div>
    </div>
  );
}
