import TemplatesGallery from "@/components/templates/template-gallery";
import { GetAvailableTemplates } from "@/features/templates/get-gallery-templates";
import { GetTopics } from "@/features/topics/get-topics";
export const dynamic = "force-dynamic";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("TemplatesPage");
  const templates = await GetAvailableTemplates();
  const topics = await GetTopics();

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="p-6">
        {templates.length === 0 ? (
          <p className="text-center text-muted-foreground text-xl font-semibold">
            {t("noTemplates")}
          </p>
        ) : (
          <>
            <TemplatesGallery templates={templates} topics={topics} />
          </>
        )}
      </div>
    </div>
  );
}
