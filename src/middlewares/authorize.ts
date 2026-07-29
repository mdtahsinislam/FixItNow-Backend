import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const authorize =
  (...roles: string[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;

    if (!user) {
      return next(
        new AppError(401, "Unauthorized")
      );
    }

    if (!roles.includes(user.role)) {
      return next(
        new AppError(403, "Forbidden")
      );
    }

    next();
  };

export default authorize;