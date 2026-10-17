import { z } from "zod";

export const CreateProductDto = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  description: z
    .string()
    .optional(),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  categoryId: z
    .string()
    .uuid("Invalid category ID"),
});

export type CreateProductDtoType =
  z.infer<typeof CreateProductDto>;