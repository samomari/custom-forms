import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const useBlockUser = () => {
  const router = useRouter();
  const t = useTranslations("API");

  const blockUser = async (id: string) => {
    try {
      const response = await axios.post(`/api/users/${id}`);
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
    }
  };

  return { blockUser };
};
