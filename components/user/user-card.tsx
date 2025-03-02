import { UserType } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  const t = useTranslations("Dashboard");
  return (
    <Card className="mb-2">
      <div className="flex flex-col p-4 space-y-3">
        <CardTitle className="text-xl font-semibold">
          {t("username")}: {user.username}
        </CardTitle>
        <CardDescription>
          {t("email")}: {user.email}
        </CardDescription>
        <CardDescription>
          {t("status")}: {user.status}
        </CardDescription>

        <div className="flex-row justify-between items-center">
          <div className="flex">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 mt-2 md:mt-0">
              Salesforce
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
