
import { Request, Response } from "express";
import { createPaymentService } from "./payments.service";
import { VerifyPaymentDto } from "./dto/verify-payment.dto";
import { verifyPaymentService } from "./payments.service";

type OrderParams = {
  orderId: string;
};

type AuthRequest = Request<OrderParams> & {
  user?: {
    userId: string;
    role: string;
  };
};

export const createPayment = async (
  req: AuthRequest,
  res: Response
) => {
  console.log("PAYMENT ROUTE HIT");
  console.log("USER ID:", req.user?.userId);
  console.log("ORDER ID:", req.params.orderId);

  try {
    const result = await createPaymentService(
      req.user!.userId,
      req.params.orderId
    );

    console.log("PAYMENT CREATED SUCCESSFULLY");

    return res.status(201).json({
      success: true,
      message: "Payment order created successfully",
      data: result,
    });
  } catch (error) {
    console.error("PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown payment error",
    });
  }
};


export const verifyPayment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const validatedData = VerifyPaymentDto.parse(req.body);

    const result = await verifyPaymentService(
      req.user!.userId,
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    if (error instanceof Error) {
      console.error("ERROR MESSAGE:", error.message);
      console.error("ERROR STACK:", error.stack);
    }

    res.status(500).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Unknown payment error",
    });
  }
};

