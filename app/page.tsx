import TemplatesGallery from "@/components/templates/template-gallery";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fakeTemplates = [
  {
    id: "1",
    title: "Template 1",
    description: "This is a template description.",
    likeCount: 10,
    imageUrl: "",
  },
  {
    id: "2",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "4",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "5",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "6",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
];

export default async function Home() {
  return (
    <div className="h-full w-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Most popular templates
        </h1>
        <TemplatesGallery templates={fakeTemplates} />
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
