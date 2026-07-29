import { Request, Response, NextFunction } from "express";
declare const auth: (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => void;
export default auth;
//# sourceMappingURL=auth.d.ts.map