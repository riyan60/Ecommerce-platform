
import razorpay from "../../config/razorpay";
import prisma from "../../config/prisma";
import { getMyOrderByIdService } from "../orders/orders.service";
import crypto from "crypto";

export const createPaymentService = async (
  userId: string,
  orderId: string
) => {
  // Verify that the order belongs to this customer
  const order = await getMyOrderByIdService(userId, orderId);

  // Check whether this order has already been paid
  const successfulPayment = await prisma.payment.findFirst({
    where: {
      orderId,
      status: "SUCCESS",
    },
  });

  if (successfulPayment) {
    throw new Error("This order has already been paid");
  }

  // Convert rupees to paise
  const amount = Math.round(Number(order.totalAmount) * 100);

  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error("Invalid payment amount");
  }

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: orderId,
    notes: {
      orderId,
      userId,
    },
  });

  // Save payment attempt in database
  const payment = await prisma.payment.create({
    data: {
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: order.totalAmount,
      currency: "INR",
      status: "PENDING",
    },
  });

  return {
    payment,
    razorpayOrder: {
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    },
    keyId: process.env.RAZORPAY_KEY_ID,
  };
};


export const verifyPaymentService = async (
  userId: string,
  data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      razorpayOrderId: data.razorpay_order_id,
    },
    include: {
      order: true,
    },
  });

  if (!payment || payment.order.userId !== userId) {
    throw new Error("Payment not found");
  }

  if (payment.status === "SUCCESS") {
    throw new Error("Payment already verified");
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error("Razorpay secret is not configured");
  }

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(
      `${data.razorpay_order_id}|${data.razorpay_payment_id}`
    )
    .digest("hex");

  const expected = Buffer.from(generatedSignature, "hex");
  const received = Buffer.from(data.razorpay_signature, "hex");

  if (
    expected.length !== received.length ||
    !crypto.timingSafeEqual(expected, received)
  ) {
    throw new Error("Invalid payment signature");
  }

  const updatedPayment = await prisma.$transaction(async (tx) => {
    const result = await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        razorpayPaymentId: data.razorpay_payment_id,
        status: "SUCCESS",
      },
    });

    await tx.order.update({
      where: {
        id: payment.orderId,
      },
      data: {
        status: "CONFIRMED",
      },
    });

    return result;
  });

  return updatedPayment;
};

