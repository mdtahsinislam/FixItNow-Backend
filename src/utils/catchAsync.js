"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map