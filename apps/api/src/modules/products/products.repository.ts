import prisma from "../../config/prisma";

export const createProduct = async (
  name: string,
  description: string | undefined,
  price: number,
  categoryId: string
) => {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
    },
    include: {
      category: true,
    },
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    categoryId?: string;
  }
) => {
  return prisma.product.update({
    where: {
      id,
    },
    data,
    include: {
      category: true,
    },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};