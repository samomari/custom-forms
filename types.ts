export type GalleryTemplateType = {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  username?: string;
};

export type TemplateType = GalleryTemplateType & {
  userId: string;
  topicId: string;
  likeCount: number;
  isPublic: boolean;
};

export const ResponseTypes = [
  { id: 0, label: "String" },
  { id: 1, label: "Text" },
  { id: 2, label: "Integer" },
  { id: 3, label: "Checkbox" },
];

export type QuestionType = {
  id: string;
  text: string;
  type: number;
};

export type UserType = {
  id: string;
  email: string;
  username: string;
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
