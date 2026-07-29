"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceValidation = exports.createServiceValidation = void 0;
const zod_1 = require("zod");
exports.createServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
        description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
        category: zod_1.z.string().min(2, "Category is required"),
        price: zod_1.z.number().min(0, "Price must be a positive number"),
        image: zod_1.z.string().url().optional(),
    }),
});
exports.updateServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).optional(),
        description: zod_1.z.string().min(10).optional(),
        category: zod_1.z.string().min(2).optional(),
        price: zod_1.z.number().min(0).optional(),
        image: zod_1.z.string().url().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=service.validation.js.map