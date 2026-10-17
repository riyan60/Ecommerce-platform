import { z } from "zod";

export const CreateOrderDto = z.object({});

export type CreateOrderDtoType =
  z.infer<typeof CreateOrderDto>;

  