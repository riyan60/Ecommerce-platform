import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
} from "./auth.repository";

import { RegisterDtoType } from "./dto/register.dto";
import { LoginDtoType } from "./dto/login.dto";
import { generateAccessToken } from "../../utils/jwt";

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

// 👇 Add this below registerUser

export const loginUser = async (
  data: LoginDtoType
) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(
    user.id,
    user.role
  );

  const { password, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
  };
};