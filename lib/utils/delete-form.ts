import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const useDeleteForm = () => {
  const t = useTranslations("API");
  const router = useRouter();

  const deleteForm = async (id: string) => {
    try {
      const response = await axios.delete(`/api/forms/${id}`);
      if (response.status === 200) {
        toast({
          title: t("success"),
          description: t(response.data.message),
        });
        router.refresh();
      }
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

  return { deleteForm };
};
