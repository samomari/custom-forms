import TemplatesGallery from "@/components/templates/template-gallery";
import { GetAvailableTemplates } from "@/features/templates/get-gallery-templates";
export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";

export default async function Page() {
  const templates = await GetAvailableTemplates();

  const t = await getTranslations("TemplatesPage");
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-6">
        {templates.length === 0 ? (
          <p className="text-center text-muted-foreground text-xl font-semibold">
            {t("noTemplates")}
          </p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              {t("availableTemplates")}
            </h1>
            <TemplatesGallery templates={templates} />
          </>
        )}
      </div>
    </div>
  );
}
