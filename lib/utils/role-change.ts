import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const useRoleChange = () => {
  const t = useTranslations("API");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const roleChange = async (id: string, role: "USER" | "ADMIN") => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.patch(`/api/users/${id}`, { role });
      toast({
        title: t("success"),
        description: t(response.data.message),
      });
      router.refresh();
    } catch (error) {
      router.refresh();
      toast({
        title: t("error"),
        description:
          // @ts-expect-error ignore
          t(error.response?.data?.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { roleChange, loading };
};
