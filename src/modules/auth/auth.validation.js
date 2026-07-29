"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const zod_1 = require("zod");
exports.registerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, "Name must be at least 3 characters"),
        email: zod_1.z
            .string()
            .email("Invalid email"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters"),
        phone: zod_1.z
            .string()
            .optional(),
        address: zod_1.z
            .string()
            .optional(),
    }),
});
exports.loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email(),
        password: zod_1.z
            .string()
            .min(6),
    }),
});
//# sourceMappingURL=auth.validation.js.map