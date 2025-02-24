import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { useTranslations } from "next-intl";

interface ConfirmDialogProps {
  onConfirm: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ConfirmDialog = ({
  onConfirm,
  open,
  setOpen,
}: ConfirmDialogProps) => {
  const t = useTranslations("ConfirmDialog");
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-baseline">
          <AlertDialogCancel onClick={() => setOpen(false)}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
