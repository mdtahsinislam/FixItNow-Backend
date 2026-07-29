



//D:\FixItNow-Backend\src\middlewares\auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import AppError from "../utils/AppError";

const auth = (...roles: string[]) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      const token =
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AppError(401, "Unauthorized");
      }

      const decoded = jwt.verify(
        token,
        env.jwt.accessSecret
      ) as jwt.JwtPayload;

      (req as any).user = decoded;

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        throw new AppError(
          403,
          "Forbidden"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;