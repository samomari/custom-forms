"use client";
import { TemplateCard } from "./template-card";

interface TemplatesGalleryProps {
  templates: Array<{
    id: string;
    title: string;
    description: string;
    likeCount: number;
    imageUrl?: string;
  }>;
}

export default function TemplatesGallery({ templates }: TemplatesGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
      {templates.map((template) => (
        <TemplateCard key={template.id} {...template} />
      ))}
    </div>
  );
}
