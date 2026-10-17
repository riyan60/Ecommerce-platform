import prisma from "../../config/prisma";

import {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  updateOrderStatus,
} from "./orders.repository";

import { getCartByUserId, clearCart } from "../cart/cart.repository";

import { UpdateOrderStatusDtoType } from "./dto/update-order.dto";

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

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Create the order and clear the cart in one transaction.
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        totalAmount: totalAmount.toFixed(2),
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
      where: {
        cartId: cart.id,
      },
    });

    return createdOrder;
  });

  return order;
};

export const getMyOrdersService = async (userId: string) => {
  return getOrdersByUserId(userId);
};

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

export const updateOrderStatusService = async (
  orderId: string,
  data: UpdateOrderStatusDtoType
) => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  return updateOrderStatus(orderId, data.status);
};