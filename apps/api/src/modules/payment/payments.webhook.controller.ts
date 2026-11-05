
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { processRazorpayWebhook } from "./payments.webhook.service";

export const handleRazorpayWebhook = async (
  req: Request,
  res: Response
) => {
  try {
    if (!Buffer.isBuffer(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Expected raw webhook body",
      });
    }

    const signature = req.headers["x-razorpay-signature"];
    const eventId = req.headers["x-razorpay-event-id"];

    if (
      typeof signature !== "string" ||
      typeof eventId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing webhook signature or event ID",
      });
    }

    const result = await processRazorpayWebhook(
      req.body,
      signature,
      eventId
    );

    return res.status(200).json({
      success: true,
      message: "Webhook processed",
      data: result,
    });
  } catch (error) {
    // Razorpay may retry an event it has already delivered.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(200).json({
        success: true,
        message: "Webhook event already processed",
      });
    }

    console.error("RAZORPAY WEBHOOK ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Webhook processing failed",
    });
  }
};
