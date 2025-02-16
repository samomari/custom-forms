import { QuestionType, TemplateType, UserType } from "@/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface CreateFormFormProps {
  template: TemplateType;
  questions: QuestionType[];
  user: UserType;
}

export default function CreateFormForm({
  template,
  // questions,
  // user,
}: CreateFormFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="xl:w-1/2 md:w-1/2 flex justify-center items-baseline">
      <div className="w-full text-zinc-600 dark:text-zinc-300 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader className="text-xl uppercase text-center">
                <CardTitle>{template.title}</CardTitle>
                <CardDescription className="break-words">
                  {template.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
