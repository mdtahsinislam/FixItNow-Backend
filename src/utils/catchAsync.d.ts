import { Request, Response, NextFunction } from "express";
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const catchAsync: (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map