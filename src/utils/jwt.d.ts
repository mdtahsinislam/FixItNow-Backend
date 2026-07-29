import jwt, { SignOptions } from "jsonwebtoken";
export declare const createToken: (payload: object, secret: string, expiresIn: SignOptions["expiresIn"]) => never;
export declare const verifyToken: (token: string, secret: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map