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
        <CardContent className="relative w-full h-56">
          <Image
            src={imageUrl || "/images/default-template-image.png"}
            alt={t("templateImage")}
            fill
            style={{ objectFit: "cover" }}
          />
        </CardContent>
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold truncate">
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
