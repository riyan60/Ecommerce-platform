import jwt from "jsonwebtoken";

export const generateAccessToken = (
  userId: string,
  role: string
) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
};