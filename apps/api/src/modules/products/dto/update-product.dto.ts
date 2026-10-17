import { z } from "zod";

export const UpdateProductDto = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .optional(),

  description: z
    .string()
    .optional(),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .optional(),

  categoryId: z
    .string()
    .uuid("Invalid category ID")
    .optional(),
});

export type UpdateProductDtoType =
  z.infer<typeof UpdateProductDto>;