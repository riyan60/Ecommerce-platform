import { Request, Response } from "express";

import { RegisterDto } from "./dto/register.dto";
import { registerUser } from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const data = RegisterDto.parse(req.body);

    const user = await registerUser(data);

    return res.status(201).json({
      success: true,
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