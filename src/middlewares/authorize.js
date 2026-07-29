"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppError_1 = __importDefault(require("../utils/AppError"));
const authorize = (...roles) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
        return next(new AppError_1.default(401, "Unauthorized"));
    }
    if (!roles.includes(user.role)) {
        return next(new AppError_1.default(403, "Forbidden"));
    }
    next();
};
exports.default = authorize;
//# sourceMappingURL=authorize.js.map