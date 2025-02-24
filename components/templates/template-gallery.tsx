"use client";
import { GalleryTemplateType } from "@/types";
import { TemplateCard } from "./template-card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export default function TemplatesGallery({
  templates,
  topics,
}: {
  templates: GalleryTemplateType[];
  topics?: { id: string; name: string }[];
}) {
  const t = useTranslations();
  const [filter, setFilter] = useState<string>("all");
  const filteredTemplates =
    filter === "all"
      ? templates
      : templates.filter((template) => template.topicId === filter);

  return (
    <div className="h-full w-full">
      {topics && (
        <>
          <h1 className="text-2xl font-bold text-center ">
            {t("TemplatesPage.availableTemplates")}
          </h1>
          <div className="pl-4 mt-[-35px] mb-4">
            <Select
              onValueChange={(value) => setFilter(value)}
              defaultValue={filter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("TemplatesPage.filter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("TemplatesPage.allTopics")}
                </SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {t(`Topic.${topic.name}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
        {filteredTemplates.length === 0 ? (
          <p>No templates available</p>
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))
        )}
      </div>
    </div>
  );
}
