"use client";
import { formEditSchema } from "@/schema";
import { QuestionAnswer, ValidationError } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { GetResponseType } from "@/lib/utils/get-response-type";
import { FormInput } from "@/components/ui/form-input";
import { FormTextArea } from "@/components/ui/form-textarea";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import FormValidator from "@/lib/utils/form-validator";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const setFormErrors = (
  errors: ValidationError[],
  form: any,
  qa: QuestionAnswer[],
  t: (key: string) => string,
) => {
  errors.forEach((error) => {
    form.setError(
      `answers.${qa.findIndex((q) => q.id === error.questionId)}.answer`,
      { type: "manual", message: t(error.message) },
    );
  });
};

interface EditFormProps {
  id: string;
  title: string;
  description?: string | null;
  qa: QuestionAnswer[];
}

export default function EditForm({
  id,
  title,
  description,
  qa,
}: EditFormProps) {
  const tForm = useTranslations("Form");
  const tApi = useTranslations("API");
  const tType = useTranslations("QuestionType");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formEditSchema>>({
    defaultValues: {
      formId: id,
      answers: qa.map((q) => ({
        answerId: q.id,
        answer: q.type === 3 ? q.answer === "true" : q.answer,
      })),
    },
  });

  const onSubmit = async (values: z.infer<typeof formEditSchema>) => {
    const hasChanges = values.answers.some((answer, index) => {
      return String(answer.answer) !== String(qa[index].answer);
    });
    if (!hasChanges) return;

    const errors = FormValidator(values.answers, qa);
    if (errors.length > 0) {
      setFormErrors(errors, form, qa, tForm);
    } else {
      setLoading(true);
      try {
        const response = await axios.patch(`/api/forms/${id}`, {
          answers: values.answers,
        });
        toast({
          title: tApi("success"),
          description: tApi(response.data.message),
        });
        router.push(`/forms/${id}`);
      } catch (error) {
        toast({
          title: tApi("error"),
          description:
            // @ts-expect-error ignore
            tApi(error.response?.data.message),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    form.reset();
    router.back();
  };

  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="p-6 shadow-lg rounded-xl space-y-4">
              <CardHeader className="text-xl uppercase text-center">
                <CardTitle>{title}</CardTitle>
                <CardDescription className="break-words">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="flex flex-col space-y-4">
              {qa.map((q, index) => (
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
                            label={q.question}
                            description={q.description}
                            placeholder={tForm("enterAnswer", {
                              type: tType(
                                GetResponseType(q.type),
                              ).toLowerCase(),
                            })}
                            field={field}
                          />
                        )}
                        {q.type === 1 && (
                          <FormTextArea
                            label={q.question}
                            description={q.description}
                            placeholder={tForm("enterAnswer", {
                              type: tType(
                                GetResponseType(q.type),
                              ).toLowerCase(),
                            })}
                            field={field}
                          />
                        )}
                        {q.type === 2 && (
                          <FormInput
                            label={q.question}
                            description={q.description}
                            placeholder={tForm("enterAnswer", {
                              type: tType(
                                GetResponseType(q.type),
                              ).toLowerCase(),
                            })}
                            field={field}
                            answerType={2}
                          />
                        )}
                        {q.type === 3 && (
                          <FormCheckbox
                            label={q.question}
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
              <div className="flex justify-between pb-2">
                <Button
                  variant="outline"
                  onClick={() => handleBack()}
                  disabled={loading}
                >
                  {tForm("backButton")}
                </Button>
                <Button type="submit" disabled={loading}>
                  {tForm("submitButton")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
