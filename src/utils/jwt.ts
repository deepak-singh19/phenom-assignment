import jwt from "jsonwebtoken";

export const generateToken = (user_id: string, access_token: string): string => {
  return jwt.sign({ user_id, access_token }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
