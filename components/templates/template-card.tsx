import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GalleryTemplateType } from "@/types";
import { useTranslations } from "next-intl";
import { Image as ImageIcon } from "lucide-react";

export function TemplateCard({
  id,
  title,
  description,
  imageUrl,
  username,
}: GalleryTemplateType) {
  const t = useTranslations("TemplateCard");
  return (
    <Link href={`/templates/${id}`}>
      <Card className="shadow-lg rounded-lg overflow-hidden group relative hover:scale-105 transition-transform h-full">
        <CardContent className="relative w-full h-56 flex justify-center items-center bg-[#C1C1C1]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={t("templateImage")}
              fill
              style={{ objectFit: "contain" }}
            />
          ) : (
            <ImageIcon size={164} />
          )}
        </CardContent>
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-medium truncate mb-1">
            {title}
          </CardTitle>
          <CardDescription className="text-sm mt-2 truncate">
            {description}
          </CardDescription>
          <p className="text-xs text-muted-foreground italic mt-2 text-end">
            {t("by")} : {username}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
