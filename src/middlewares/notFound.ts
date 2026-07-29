import { Request, Response, NextFunction } from "express";

const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });

  next();
};

export default notFound;