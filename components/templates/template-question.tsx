import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripHorizontal } from "lucide-react";
import { FormField } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { ResponseTypes } from "@/types";
import { useTranslations } from "next-intl";

interface TemplateQuestionProps {
  field: any;
  index: number;
  form: any;
}

export const TemplateQuestion = ({
  field,
  index,
  form,
}: TemplateQuestionProps) => {
  const t = useTranslations("TemplateQuestion");
  const tType = useTranslations("QuestionType");
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
      className="group p-6 shadow-lg rounded-xl relative"
    >
      <button
        {...listeners}
        className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <GripHorizontal className="w-5 h-5 text-gray-500" />
      </button>
      <div className="flex justify justify-between">
        <div className="w-2/3">
          <FormField
            control={form.control}
            name={`questions.${index}.question`}
            render={({ field }) => (
              <FormInput
                label={t("questionLabel")}
                placeholder={t("questionPlaceholder")}
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
              <FormSelect
                label={t("typeLabel")}
                options={ResponseTypes.map((type) => ({
                  value: type.id.toString(),
                  label: tType(type.label),
                }))}
                field={{
                  ...field,
                  value: String(field.value),
                  onChange: (val: string) => field.onChange(parseInt(val, 10)),
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="w-full mt-2">
        <FormField
          control={form.control}
          name={`questions.${index}.description`}
          render={({ field }) => (
            <FormInput
              label={t("descriptionLabel")}
              placeholder={t("descriptionPlaceholder")}
              field={field}
            />
          )}
        />
      </div>
    </Card>
  );
};
