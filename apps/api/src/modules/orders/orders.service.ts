
import prisma from "../../config/prisma";

import {
  getOrdersByUserId,
  getOrderById,
  updateOrderStatus,
} from "./orders.repository";

import { getCartByUserId } from "../cart/cart.repository";
import { UpdateOrderStatusDtoType } from "./dto/update-order.dto";

// CREATE ORDER
export const createOrderService = async (userId: string) => {
  const cart = await getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const items = cart.items.map((item) => ({
    productId: item.productId,
    productName: item.product.name,
    price: Number(item.product.price),
    quantity: item.quantity,
  }));

  // Calculate total in paise to avoid floating-point accumulation
  const totalAmountInPaise = items.reduce(
    (total, item) =>
      total + Math.round(item.price * 100) * item.quantity,
    0
  );

  const totalAmount = (totalAmountInPaise / 100).toFixed(2);

  // Create order and clear cart in one transaction
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price.toFixed(2),
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return createdOrder;
  });

  return order;
};

// GET ALL ORDERS FOR LOGGED-IN USER
export const getMyOrdersService = async (userId: string) => {
  return getOrdersByUserId(userId);
};

// GET SINGLE ORDER
export const getMyOrderByIdService = async (
  userId: string,
  orderId: string
) => {
  const order = await getOrderById(orderId);

  if (!order || order.userId !== userId) {
    throw new Error("Order not found");
  }

  return order;
};

// UPDATE ORDER STATUS
export const updateOrderStatusService = async (
  orderId: string,
  data: UpdateOrderStatusDtoType
) => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const allowedTransitions: Record<string, string[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  const allowedStatuses = allowedTransitions[order.status] ?? [];

  if (!allowedStatuses.includes(data.status)) {
    throw new Error(
      `Cannot change order status from ${order.status} to ${data.status}`
    );
  }

  return updateOrderStatus(orderId, data.status);
};
