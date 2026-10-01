import { z } from "zod";

export const CreateCategoryDto = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters"),

  description: z
    .string()
    .optional(),
});

export type CreateCategoryDtoType =
  z.infer<typeof CreateCategoryDto>;