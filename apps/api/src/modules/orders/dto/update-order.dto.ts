import { z } from "zod";

export const UpdateOrderStatusDto = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});

export type UpdateOrderStatusDtoType =
  z.infer<typeof UpdateOrderStatusDto>;