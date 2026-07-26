import { Request, Response } from "express";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import {
  registerUser,
  loginUser,
} from "./auth.service";

/**
 * Register Controller
 * POST /api/auth/register
 */
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const data = RegisterDto.parse(req.body);

    const user = await registerUser(data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Login Controller
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const data = LoginDto.parse(req.body);

    const result = await loginUser(data);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};