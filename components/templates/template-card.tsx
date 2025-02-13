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

export function TemplateCard({
  id,
  title,
  description,
  imageUrl,
}: GalleryTemplateType) {
  return (
    <Link href={`/templates/${id}`}>
      <Card className="shadow-lg rounded-lg overflow-hidden group relative hover:scale-105 transition-transform">
        <CardContent className="relative w-full h-56">
          <Image
            src={imageUrl || "/images/default-template-image.png"}
            alt="Template Image"
            fill
            objectFit="cover"
          />
        </CardContent>
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold ">{title}</CardTitle>
          <CardDescription className="text-sm mt-2 truncate">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
