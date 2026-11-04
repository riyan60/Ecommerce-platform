import { Request, Response } from "express";

import {
  createOrderService,
  getMyOrdersService,
  getMyOrderByIdService,
  updateOrderStatusService,
} from "./orders.service";

import { UpdateOrderStatusDto } from "./dto/update-order.dto";

type OrderParams = {
  id: string;
};

type AuthRequest = Request & {
  user?: {
    userId: string;
    role: string;
  };
};

// Place an order using the logged-in user's cart
export const createOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const order = await createOrderService(req.user!.userId);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to place order",
    });
  }
};

// Get the logged-in user's orders
export const getMyOrders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orders = await getMyOrdersService(req.user!.userId);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch orders",
    });
  }
};

// Get one order belonging to the logged-in user
export const getMyOrderById = async (
  req: Request<OrderParams> & AuthRequest,
  res: Response
) => {
  try {
    const order = await getMyOrderByIdService(
      req.user!.userId,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Order not found",
    });
  }
};

// Admin updates order status
export const updateOrderStatus = async (
  req: Request<OrderParams>,
  res: Response
) => {
  try {
    const validatedData = UpdateOrderStatusDto.parse(req.body);

    const order = await updateOrderStatusService(
      req.params.id,
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update order status",
    });
  }
};