"use strict";
//D:\FixItNow-Backend\src\modules\auth\auth.utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const env_1 = require("../../config/env");
const jwt_1 = require("../../utils/jwt");
const auth_interface_1 = require("./auth.interface");
const generateAccessToken = (payload) => {
    return (0, jwt_1.createToken)(payload, env_1.env.jwt.accessSecret, env_1.env.jwt.accessExpiresIn);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return (0, jwt_1.createToken)(payload, env_1.env.jwt.refreshSecret, env_1.env.jwt.refreshExpiresIn);
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=auth.utils.js.map