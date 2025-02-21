import TemplatesGallery from "@/components/templates/template-gallery";
import { Button } from "@/components/ui/button";
import {
  GetLatestTemplates,
  GetPopularTemplates,
} from "@/features/templates/get-gallery-templates";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const populartemplates = await GetPopularTemplates();
  const latestTemplates = await GetLatestTemplates();

  return (
    <div className="h-full w-full">
      <div className="p-6">
        {populartemplates.length === 0 && latestTemplates.length === 0 ? (
          <p className="text-center text-muted-foreground text-xl font-semibold">
            No templates available at the moment.
          </p>
        ) : (
          <>
            <p className="text-2xl font-bold mb-4 text-center">
              Most popular public templates
            </p>
            <TemplatesGallery templates={populartemplates} />

            <p className="text-2xl font-bold py-2 text-center">
              Most recent templates
            </p>
            <TemplatesGallery templates={latestTemplates} />

            <div className="pt-4 flex justify-end">
              <Link href="/templates">
                <Button variant="link">
                  Browse More <ArrowRight />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
