import { Checkbox } from "../ui/checkbox";
import { FormControl, FormItem, FormLabel } from "../ui/form";

type Field = {
  value: boolean;
  onChange: (checked: boolean) => void;
};

interface FormCheckboxProps {
  label: string;
  field: Field;
}

export const FormCheckbox = ({ label, field }: FormCheckboxProps) => {
  return (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={(checked) => field.onChange(!!checked)}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel className="text-muted-foreground font-semibold">
          {label}
        </FormLabel>
      </div>
    </FormItem>
  );
};
