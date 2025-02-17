import { FormAnswer, QuestionType, ValidationError } from "@/types";

export default function FormValidator(
  answers: FormAnswer[],
  questions: QuestionType[],
) {
  const errors: ValidationError[] = [];

  answers.forEach((ans) => {
    const question = questions.find((q) => q.id === ans.questionId);
    if (!question) return;

    const { answer, questionId } = ans;
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

    if (errorMessage) {
      errors.push({ questionId, message: errorMessage });
    }
  });

  return errors;
}
