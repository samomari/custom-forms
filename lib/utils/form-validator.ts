import { ValidationError } from "@/types";

export default function FormValidator(
  answers: {
    questionId?: string;
    answerId?: string;
    answer?: string | number | boolean;
  }[],
  questions: { id: string; type: number }[],
): ValidationError[] {
  const errors: ValidationError[] = [];

  answers.forEach((ans) => {
    const question = questions.find(
      (q) => q.id === ans.questionId || q.id === ans.answerId,
    );
    if (!question) return;

    const { answer } = ans;
    const { type } = question;

    let errorMessage = "";

    if (type === 0 || type === 1) {
      if (typeof answer !== "string" || answer.trim() === "") {
        errorMessage = "This field cannot be empty";
      }
    } else if (type === 2) {
      if (isNaN(Number(answer)) || Number(answer) <= 0) {
        errorMessage = "Answer must be a positive number";
      }
    }

    const errorId = ans.questionId || ans.answerId;
    if (errorMessage && errorId) {
      errors.push({
        questionId: errorId,
        message: errorMessage,
      });
    }
  });

  return errors;
}
