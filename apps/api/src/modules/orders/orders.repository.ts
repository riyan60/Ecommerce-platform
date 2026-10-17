import prisma from "../../config/prisma";

export const createOrder = async (
  userId: string,
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[],
  totalAmount: number
) => {
  return prisma.order.create({
    data: {
      userId,
      totalAmount,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: true,
    },
  });
};

export const getOrdersByUserId = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });
};

export const updateOrderStatus = async (
  id: string,
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
) => {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      items: true,
    },
  });
};