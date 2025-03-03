"use client";
import { UserType } from "@/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SalesforceDialog } from "@/components/dialogs/salesforce-dialog";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Dashboard");

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token).then(() => {
      toast({
        title: "success",
        description: "Token copied to clipbaord",
      });
    });
  };

  const handleGetToken = async () => {
    setLoading(true);
    if (user.token) {
      copyToken(user?.token);
      setLoading(false);
    } else {
      try {
        const response = await axios.patch(`/api/users/${user.id}/token`);
        const newToken = response.data.user.token;
        copyToken(newToken);
        console.log(newToken);
      } catch (error) {
        console.error("Error getting token:", error);
      } finally {
        setLoading(false);
      }
    }
  };
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
          <div className="flex space-x-3">
            {!user.sfAccountId && (
              <Button
                onClick={() => setOpen(true)}
                className="bg-indigo-600 text-white hover:bg-indigo-700 mt-2 md:mt-0"
                disabled={loading}
              >
                {t("sfSyncButton")}
              </Button>
            )}
            <Button disabled={loading} onClick={handleGetToken}>
              Get odoo token
            </Button>
          </div>
        </div>
      </div>
      <SalesforceDialog open={open} setOpen={setOpen} user={user} />
    </Card>
  );
}
