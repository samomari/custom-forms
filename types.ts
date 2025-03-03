export type GalleryTemplateType = {
  id: string;
  title: string;
  topicId: string;
  description?: string | null;
  imageUrl?: string | null;
  username?: string;
};

export type TemplateType = GalleryTemplateType & {
  userId: string;
  likeCount: number;
  isPublic: boolean;
};

export type QuestionAnswer = {
  id: string;
  question: string;
  description?: string | null;
  answer: string;
  type: number;
};

export const ResponseTypes = [
  { id: 0, label: "string" },
  { id: 1, label: "text" },
  { id: 2, label: "integer" },
  { id: 3, label: "checkbox" },
];

export type QuestionType = {
  id: string;
  text: string;
  description?: string | null;
  type: number;
};

export type UserType = {
  id: string;
  email: string;
  username: string;
  sfAccountId: string | null;
  token: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
};

export type TopicType = {
  id: string;
  name: string;
};

export type FormAnswer = {
  questionId: string;
  answer?: string | number | boolean;
};

export type ValidationError = {
  questionId: string;
  message: string;
};
