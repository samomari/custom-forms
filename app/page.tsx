import TemplatesGallery from "@/components/templates/template-gallery";
import { Button } from "@/components/ui/button";
import { GetPopularTemplates } from "@/features/templates/get-popular-templates";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const templates = await GetPopularTemplates();
  return (
    <div className="h-full w-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Most popular templates
        </h1>
        <TemplatesGallery templates={templates} />
        <div className="pt-4 flex justify-end">
          <Link href="/templates">
            <Button variant="link">
              Browse More <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
