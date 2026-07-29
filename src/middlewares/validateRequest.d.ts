import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
declare const validateRequest: (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map