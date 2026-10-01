import { Request, Response } from "express";
import { getProfile } from "./users.service";

export const me = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getProfile(req.user!.userId);

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};