import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useDeleteForm = () => {
  const router = useRouter();

  const deleteForm = async (id: string) => {
    try {
      const response = await axios.delete(`/api/forms/${id}`);
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
    }
  };

  return { deleteForm };
};
