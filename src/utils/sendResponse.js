"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendResponse = (res, data) => {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map