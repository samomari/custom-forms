import TemplatesGallery from "@/components/templates/template-gallery";
import { Button } from "@/components/ui/button";
import {
  GetLatestTemplates,
  GetPopularTemplates,
} from "@/features/templates/get-gallery-templates";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const populartemplates = await GetPopularTemplates();
  const latestTemplates = await GetLatestTemplates();
  const t = await getTranslations("HomePage");
  return (
    <div className="h-full w-full">
      <div className="md:px-6 py-6 xl:px-8 px-2">
        {populartemplates.length === 0 && latestTemplates.length === 0 ? (
          <p className="text-center text-muted-foreground text-xl font-semibold">
            {t("noTemplates")}
          </p>
        ) : (
          <>
            <p className="text-3xl font-bold mb-6 text-start">
              {t("mostPopular")}
            </p>
            <TemplatesGallery templates={populartemplates} />

            <div className="flex justify-between items-baseline">
              <p className="text-3xl font-bold text-start mb-6 mt-8">
                {t("latestTemplates")}
              </p>
              <div className="pt-4 flex justify-end">
                <Link href="/templates">
                  <Button variant="link" className="text-lg">
                    {t("browseMore")} <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
            <TemplatesGallery templates={latestTemplates} />
          </>
        )}
      </div>
    </div>
  );
}
