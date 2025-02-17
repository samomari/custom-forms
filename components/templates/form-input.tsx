import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Field = {
  value: string;
};

interface FormInputProps {
  label: string;
  placeholder: string;
  field: Field;
  answerType?: number;
}

export const FormInput = ({
  label,
  placeholder,
  field,
  answerType,
}: FormInputProps) => {
  return (
    <FormItem>
      <FormLabel className="uppercase font-bold">{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          className="w-full font-semibold"
          type={answerType === 2 ? "number" : "text"}
          min={answerType === 2 ? 1 : ""}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
