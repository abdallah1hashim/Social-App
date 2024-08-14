import { z } from "zod";

export const CreatePostFormSchema = z.object({
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters long." })
    .trim()
    .max(350, { message: "Content must be less than 350 characters long." }),
});
export type CreatePostFormState =
  | {
      errors?: {
        content?: string[];
      };
      message?: string;
    }
  | undefined;
