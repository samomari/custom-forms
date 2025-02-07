"use client";
import TemplatesGallery from "@/components/templates/template-gallery";

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
  {
    id: "23",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "12",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "232",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "21113",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "1222",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
  {
    id: "2312",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
  },
];

export default function Page() {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          All templates available to you
        </h1>
        <TemplatesGallery templates={fakeTemplates} />
      </div>
    </div>
  );
}
