import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  label: string;
  options: { value: string; label: string }[];
  field: any;
}

export const FormSelect = ({ label, options, field }: FormSelectProps) => (
  <FormItem>
    <FormLabel className="uppercase font-bold">{label}</FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="font-semibold">
          <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="font-semibold"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <FormMessage />
  </FormItem>
);
