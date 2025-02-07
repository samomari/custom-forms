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

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  likeCount: number;
  imageUrl?: string;
}

export function TemplateCard({
  title,
  description,
  likeCount,
  imageUrl,
}: TemplateCardProps) {
  return (
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
      <CardFooter className="flex justify-end items-center p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">
          <Button variant="ghost" className="text-indigo-600">
            Use Template
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center text-red-500 hover:text-red-600">
            <Heart className="h-5 w-5 mr-1" />
            <span className="text-sm">{likeCount}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
