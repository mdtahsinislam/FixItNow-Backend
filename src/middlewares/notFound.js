"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route Not Found: ${req.originalUrl}`,
    });
    next();
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map