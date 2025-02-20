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

interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  open,
  setOpen,
}: ConfirmDialogProps) => {
  console.log("isOpen dialog", open);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-baseline">
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
