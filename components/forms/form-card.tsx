"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface FormCardProps {
  id: string;
  username: string;
  updatedAt: Date;
}

export function FormCard({ id, username, updatedAt }: FormCardProps) {
  const t = useTranslations();
  return (
    <Link href={`/forms/${id}`}>
      <Card className="shadow-lg rounded-lg overflow-hidden group relative hover:scale-105 transition-transform h-full">
        <CardHeader className="p-4 flex flex-col">
          <CardTitle className="text-lg font-semibold mb-2">
            {t("Form.formFilled", { username: username })}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t("Form.formId", { id: id })}
          </p>
          <CardDescription className="text-sm mt-2 truncate">
            {t("Form.lastUpdated", {
              date: new Date(updatedAt).toLocaleString("lt-LT"),
            })}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
