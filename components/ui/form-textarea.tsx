import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./textarea";

type Field = {
  value: string;
};

interface FormTextAreaProps {
  label: string;
  description?: string | null;
  placeholder: string;
  field: Field;
}

export const FormTextArea = ({
  label,
  description,
  placeholder,
  field,
}: FormTextAreaProps) => {
  return (
    <FormItem>
      <FormLabel className="uppercase font-bold">{label}</FormLabel>
      {description && (
        <FormLabel className="text-sm text-muted-foreground block">
          {description}
        </FormLabel>
      )}
      <FormControl>
        <Textarea
          placeholder={placeholder}
          {...field}
          className="font-semibold resize-none text-md"
          rows={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
