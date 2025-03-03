import { z } from "zod";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import axios from "axios";
import { UserType } from "@/types";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useSalesforceSchema } from "@/schema";
import { useTranslations } from "next-intl";

interface SalesforceDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: UserType;
}

export const SalesforceDialog = ({
  open,
  setOpen,
  user,
}: SalesforceDialogProps) => {
  const t = useTranslations();
  const tSf = useTranslations("SalesforceDialog");
  const router = useRouter();
  const sfSchema = useSalesforceSchema();

  const form = useForm<z.infer<typeof sfSchema>>({
    resolver: zodResolver(sfSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      website: "",
      industry: "",
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof sfSchema>) => {
    try {
      const data = {
        ...values,
        userId: user.id,
        email: user.email,
        username: user.username,
      };

      const response = await axios.post("/api/salesforce", data);

      toast({
        title: t("API.success"),
        description: t(`API.${response.data.message}`),
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: t("API.error"),
        description:
          // @ts-expect-error ignore
          t(`API.${error.response?.data?.message}`),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tSf("title")}</DialogTitle>
          <DialogDescription>{tSf("description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tSf("firstName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tSf("firstNamePlaceholder")}
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tSf("lastName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tSf("lastNamePlaceholder")}
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tSf("phone")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tSf("phonePlaceholder")}
                      {...field}
                      className="font-semibold"
                      type="tel"
                      pattern="^\+?[0-9]{9,15}$"
                      title={tSf("phoneTitle")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tSf("website")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tSf("websitePlaceholder")}
                      {...field}
                      className="font-semibold"
                      type="url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tSf("industry")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tSf("industryPlaceholder")}
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tSf("contactTitle")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tSf("contactTitlePlaceholder")}
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                {t("ConfirmDialog.cancel")}
              </Button>
              <Button type="submit">{t("Form.submitButton")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
