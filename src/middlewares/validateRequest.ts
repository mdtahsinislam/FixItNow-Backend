import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: AnyZodObject) =>
  async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;