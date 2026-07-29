import { Request, Response, NextFunction } from "express";
declare const authorize: (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => void;
export default authorize;
//# sourceMappingURL=authorize.d.ts.map