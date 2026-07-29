


//D:\FixItNow-Backend\src\modules\auth\auth.utils.ts

import { env } from "../../config/env";
import { createToken } from "../../utils/jwt";
import { IJwtPayload } from "./auth.interface";

export const generateAccessToken = (payload: IJwtPayload) => {
  return createToken(
    payload,
    env.jwt.accessSecret,
    env.jwt.accessExpiresIn
  );
};

export const generateRefreshToken = (payload: IJwtPayload) => {
  return createToken(
    payload,
    env.jwt.refreshSecret,
    env.jwt.refreshExpiresIn
  );
};