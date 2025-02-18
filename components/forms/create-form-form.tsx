"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionType, TemplateType, ValidationError } from "@/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import { FormTextArea } from "@/components/ui/form-textarea";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { formSchema } from "@/schema";
import FormValidator from "@/lib/utils/form-validator";
import { GetResponseType } from "@/lib/utils/get-response-type";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const setFormErrors = (
  errors: ValidationError[],
  // eslint-disable-next-line
  form: any,
  questions: QuestionType[],
) => {
  errors.forEach((error) => {
    form.setError(
      `answers.${questions.findIndex((q) => q.id === error.questionId)}.answer`,
      { type: "manual", message: error.message },
    );
  });
};

interface CreateFormFormProps {
  template: TemplateType;
  questions: QuestionType[];
}

export default function CreateFormForm({
  template,
  questions,
}: CreateFormFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      templateId: template.id,
      answers: questions.map((q) => ({
        questionId: q.id,
        answer: q.type === 2 ? "" : q.type === 3 ? false : "",
      })),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const errors = FormValidator(values.answers, questions);
    if (errors.length > 0) {
      setFormErrors(errors, form, questions);
    } else {
      try {
        await axios.post("/api/forms", {
          templateId: template.id,
          answers: values.answers,
        });

        toast({
          title: "Success",
          description: "Form submited",
        });
        router.push("/");
      } catch (error) {
        toast({
          title: "Error",
          description:
            // @ts-expect-error ignore
            error.response?.data.message || "An unexpected error occcured",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="p-6 shadow-lg rounded-xl space-y-4">
              <CardHeader className="text-xl uppercase text-center">
                <CardTitle>{template.title}</CardTitle>
                <CardDescription className="break-words">
                  {template.description}
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="flex flex-col space-y-4">
              {questions.map((q, index) => (
                <Card
                  key={q.id}
                  className="group flex justify-between p-6 shadow-lg rounded-xl relative"
                >
                  <FormField
                    control={form.control}
                    name={`answers.${index}.answer`}
                    render={({ field }) => (
                      <div className="flex flex-col w-full">
                        {q.type === 0 && (
                          <FormInput
                            label={q.text}
                            placeholder={`Enter ${GetResponseType(q.type).toLowerCase()} type answer `}
                            field={field}
                          />
                        )}

                        {q.type === 1 && (
                          <FormTextArea
                            label={q.text}
                            placeholder={`Enter ${GetResponseType(q.type).toLowerCase()} type answer `}
                            field={field}
                          />
                        )}

                        {q.type === 2 && (
                          <FormInput
                            label={q.text}
                            placeholder={`Enter ${GetResponseType(q.type).toLowerCase()} type answer `}
                            field={field}
                            answerType={2}
                          />
                        )}

                        {q.type === 3 && (
                          <FormCheckbox
                            label={q.text}
                            field={{
                              value: form.getValues(`answers.${index}.answer`),
                              onChange: (checked) =>
                                form.setValue(
                                  `answers.${index}.answer`,
                                  checked,
                                ),
                            }}
                          />
                        )}
                      </div>
                    )}
                  />
                </Card>
              ))}
              <div className="flex justify-end pb-2">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
