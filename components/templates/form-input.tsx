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
}

export const FormInput = ({ label, placeholder, field }: FormInputProps) => {
  return (
    <FormItem>
      <FormLabel className="uppercase font-bold">{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          className="w-full font-semibold"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
