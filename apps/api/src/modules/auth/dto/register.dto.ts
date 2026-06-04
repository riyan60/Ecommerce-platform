import { z } from "zod";

export const RegisterDto = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;