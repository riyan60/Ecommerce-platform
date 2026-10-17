import { z } from "zod";

export const AddCartItemDto = z.object({
  productId: z
    .string()
    .uuid("Invalid product ID"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

export type AddCartItemDtoType =
  z.infer<typeof AddCartItemDto>;