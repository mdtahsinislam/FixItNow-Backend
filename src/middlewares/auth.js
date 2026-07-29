"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//D:\FixItNow-Backend\src\middlewares\auth.ts
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../utils/AppError"));
const auth = (...roles) => {
    return (req, _res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                throw new AppError_1.default(401, "Unauthorized");
            }
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwt.accessSecret);
            req.user = decoded;
            if (roles.length &&
                !roles.includes(decoded.role)) {
                throw new AppError_1.default(403, "Forbidden");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = auth;
//# sourceMappingURL=auth.js.map