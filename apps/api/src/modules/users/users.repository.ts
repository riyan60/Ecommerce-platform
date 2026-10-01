import prisma from "../../config/prisma";

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};