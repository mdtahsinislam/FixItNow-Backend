"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const express_1 = require("express");
const validateRequest = (schema) => async (req, _res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map