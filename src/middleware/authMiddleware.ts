import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";


interface AuthRequest extends Request {
  user?: { user_id: string; access_token: string };
}

const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized: No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return next(new AppError("Forbidden: Invalid token", 403));

    if (typeof decoded !== "object") {
      return next(new AppError("Invalid token payload", 403));
    }

    // console.log("JWT decoded",decoded)
    const accessToken = decoded.access_token
    if (!accessToken) {
      return next(new AppError("Missing Spotify access token", 401));
    }

    req.user = { user_id: decoded.user_id, access_token: accessToken };
    next();
  });
};

export default authenticateJWT;
