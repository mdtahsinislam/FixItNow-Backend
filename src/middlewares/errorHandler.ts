import { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("====================================");
  console.error(error);
  console.error("====================================");

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",

    stack:
      process.env.NODE_ENV === "development"
        ? error.stack
        : undefined,
  });

  next();
};

export default errorHandler;