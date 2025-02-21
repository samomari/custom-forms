import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useDeleteUser = () => {
  const router = useRouter();

  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`/api/users/${id}`);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.refresh();
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

  return { deleteUser };
};
