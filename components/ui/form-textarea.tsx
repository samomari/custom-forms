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
  placeholder: string;
  field: Field;
}

export const FormTextArea = ({
  label,
  placeholder,
  field,
}: FormTextAreaProps) => {
  return (
    <FormItem>
      <FormLabel className="uppercase font-bold">{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          {...field}
          className="font-semibold resize-none"
          rows={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
