import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
        <textarea
          placeholder={placeholder}
          {...field}
          className="w-full font-semibold border p-2 resize-none"
          rows={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
