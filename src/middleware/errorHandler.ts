import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err as AppError;

  if (!(err instanceof AppError)) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  console.error(`Error: ${err.message}`);

  res.status(statusCode || 500).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
