import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useDeleteTemplate = () => {
  const router = useRouter();

  const deleteTemplate = async (id: string) => {
    try {
      const response = await axios.delete(`/api/templates/${id}`);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.refresh();
      }
    } catch (error) {
      router.refresh();
      toast({
        title: "Error",
        description:
          // @ts-expect-error ignore
          error.response?.data?.message,
        variant: "destructive",
      });

      // @ts-expect-error ignore
      if (error.response?.status === 404) {
        router.push("/templates");
      }
    }
  };

  return { deleteTemplate };
};
