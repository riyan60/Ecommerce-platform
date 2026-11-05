import { z } from "zod";

export const VerifyPaymentDto = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export type VerifyPaymentDtoType = z.infer<
  typeof VerifyPaymentDto
>;