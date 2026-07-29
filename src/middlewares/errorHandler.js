"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler = (error, req, res, next) => {
    console.error("====================================");
    console.error(error);
    console.error("====================================");
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development"
            ? error.stack
            : undefined,
    });
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map