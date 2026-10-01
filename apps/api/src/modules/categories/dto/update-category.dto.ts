import { z } from "zod";

export const UpdateCategoryDto = z.object({
  name: z
    .string()
    .min(2)
    .optional(),

  description: z
    .string()
    .optional(),
});

export type UpdateCategoryDtoType =
  z.infer<typeof UpdateCategoryDto>;