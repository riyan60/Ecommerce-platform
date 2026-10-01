import { findUserById } from "./users.repository";

export const getProfile = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...safeUser } = user;

  return safeUser;
};