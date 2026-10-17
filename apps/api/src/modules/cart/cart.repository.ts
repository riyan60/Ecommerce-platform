import prisma from "../../config/prisma";

export const getOrCreateCart = async (userId: string) => {
  return prisma.cart.upsert({
    where: {
      userId,
    },
    create: {
      userId,
    },
    update: {},
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
};

export const getCartByUserId = async (userId: string) => {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
};

export const getCartItem = async (
  cartId: string,
  productId: string
) => {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  });
};

export const addCartItem = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  return prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
    create: {
      cartId,
      productId,
      quantity,
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    include: {
      product: true,
    },
  });
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number
) => {
  return prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity,
    },
    include: {
      product: true,
    },
  });
};

export const removeCartItem = async (
  cartItemId: string
) => {
  return prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};

export const clearCart = async (cartId: string) => {
  return prisma.cartItem.deleteMany({
    where: {
      cartId,
    },
  });
};