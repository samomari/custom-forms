import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripHorizontal } from "lucide-react";
import { FormField } from "@/components/ui/form";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";

interface TemplateQuestionProps {
  // eslint-disable-next-line
  field: any;
  index: number;
  // eslint-disable-next-line
  form: any;
  types: string[];
}

export const TemplateQuestion = ({
  field,
  index,
  form,
  types,
}: TemplateQuestionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="group flex justify-between p-6 shadow-lg rounded-xl relative"
    >
      <button
        {...listeners}
        className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <GripHorizontal className="w-5 h-5 text-gray-500" />
      </button>
      <div className="w-2/3">
        <FormField
          control={form.control}
          name={`questions.${index}.question`}
          render={({ field }) => (
            <FormInput
              label="Question"
              placeholder="Enter your question"
              field={field}
            />
          )}
        />
      </div>
      <div className="ml-4 w-1/3">
        <FormField
          control={form.control}
          name={`questions.${index}.type`}
          render={({ field }) => (
            <FormSelect label="Question Type" options={types} field={field} />
          )}
        />
      </div>
    </Card>
  );
};
