import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
} from "./auth.repository";

import { RegisterDtoType } from "./dto/register.dto";

export const registerUser = async (
  data: RegisterDtoType
) => {
  const existingUser = await findUserByEmail(
    data.email
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await createUser(
    data.name,
    data.email,
    hashedPassword
  );

  const { password, ...safeUser } = user;

  return safeUser;
};