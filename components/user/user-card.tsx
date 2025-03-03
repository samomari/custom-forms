"use client";
import { UserType } from "@/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SalesforceDialog } from "@/components/dialogs/salesforce-dialog";

interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  const [open, setOpen] = useState(false);
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
        {user.sfAccountId && (
          <CardDescription>
            {t("sfAccId", { id: user.sfAccountId })}
          </CardDescription>
        )}

        <div className="flex-row justify-between items-center">
          <div className="flex">
            {!user.sfAccountId && (
              <Button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white hover:bg-indigo-700 mt-2 md:mt-0"
              >
                {t("sfSyncButton")}
              </Button>
            )}
          </div>
        </div>
      </div>
      <SalesforceDialog open={open} setOpen={setOpen} user={user} />
    </Card>
  );
}
