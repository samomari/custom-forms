import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  likeCount: number;
  imageUrl?: string;
}

export function TemplateCard({
  id,
  title,
  description,
  likeCount,
  imageUrl,
}: TemplateCardProps) {
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
          <CardDescription className="text-sm mt-2">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
