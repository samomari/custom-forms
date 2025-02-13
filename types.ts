export type GalleryTemplateType = {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
};

export type TemplateType = GalleryTemplateType & {
  userId: string;
  topicId: string;
  likeCount: number;
};

export type QuestionType = {
  id: string;
  text: string;
  type: string;
};
