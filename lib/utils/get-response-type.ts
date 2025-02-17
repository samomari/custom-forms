import { ResponseTypes } from "@/types";

export const GetResponseType = (typeId: number) => {
  const type = ResponseTypes.find((t) => t.id === typeId);
  return type ? type.label : "Unknown";
};
