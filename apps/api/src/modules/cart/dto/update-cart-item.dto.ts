import { z } from "zod";

export const UpdateCartItemDto = z.object({
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

export type UpdateCartItemDtoType =
  z.infer<typeof UpdateCartItemDto>;