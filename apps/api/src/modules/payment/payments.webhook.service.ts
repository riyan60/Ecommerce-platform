
import crypto from "crypto";
import prisma from "../../config/prisma";

type RazorpayWebhookPayload = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        currency?: string;
        method?: string;
        error_description?: string;
      };
    };
  };
};

export const processRazorpayWebhook = async (
  rawBody: Buffer,
  signature: string,
  eventId: string
) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Razorpay webhook secret is missing");
  }

  // Verify Razorpay signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "hex");
  const received = Buffer.from(signature, "hex");

  if (
    expected.length !== received.length ||
    !crypto.timingSafeEqual(expected, received)
  ) {
    throw new Error("Invalid webhook signature");
  }

  const payload = JSON.parse(
    rawBody.toString("utf8")
  ) as RazorpayWebhookPayload;

  const event = payload.event;
  const paymentEntity = payload.payload?.payment?.entity;

  if (!paymentEntity?.order_id || !paymentEntity.id) {
    throw new Error("Invalid Razorpay payment payload");
  }

  if (!["payment.captured", "payment.failed"].includes(event)) {
    return { received: true, ignored: true };
  }

  return prisma.$transaction(async (tx) => {
    // Record the event. The unique eventId prevents duplicates.
    await tx.webhookEvent.create({
      data: {
        eventId,
        event,
      },
    });

    const payment = await tx.payment.findUnique({
      where: {
        razorpayOrderId: paymentEntity.order_id,
      },
    });

    if (!payment) {
      throw new Error("Payment record not found");
    }

    // Verify the amount and currency against our database
    const expectedAmount = Math.round(
      Number(payment.amount) * 100
    );

    if (
      paymentEntity.amount !== expectedAmount ||
      paymentEntity.currency !== payment.currency
    ) {
      throw new Error("Payment amount or currency mismatch");
    }

    if (event === "payment.captured") {
      if (payment.status === "SUCCESS") {
        return { received: true, duplicatePayment: true };
      }

      if (payment.status === "REFUNDED") {
        throw new Error("Cannot mark a refunded payment as successful");
      }

      await tx.payment.update({
        where: { id: payment.id },
        data: {
          razorpayPaymentId: paymentEntity.id,
          status: "SUCCESS",
          method: paymentEntity.method,
          failureReason: null,
        },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: "CONFIRMED" },
      });
    }

    if (event === "payment.failed") {
      if (payment.status !== "SUCCESS" && payment.status !== "REFUNDED") {
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            razorpayPaymentId: paymentEntity.id,
            status: "FAILED",
            method: paymentEntity.method,
            failureReason:
              paymentEntity.error_description ?? "Payment failed",
          },
        });
      }
    }

    return { received: true };
  });
};
