import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useBlockUser = () => {
  const router = useRouter();

  const blockUser = async (id: string) => {
    try {
      const response = await axios.post(`/api/users/${id}`);
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

  return { blockUser };
};
