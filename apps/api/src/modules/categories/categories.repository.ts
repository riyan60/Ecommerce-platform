import prisma from "../../config/prisma";

export const createCategory = async (
  name: string,
  description?: string
) => {
  return prisma.category.create({
    data: {
      name,
      description,
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCategoryById = async (
  id: string
) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const getCategoryByName = async (
  name: string
) => {
  return prisma.category.findUnique({
    where: {
      name,
    },
  });
};

export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteCategory = async (
  id: string
) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};