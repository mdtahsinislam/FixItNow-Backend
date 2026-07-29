"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = exports.updateProfileValidation = void 0;
const zod_1 = require("zod");
exports.updateProfileValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().url().optional(),
    }),
});
exports.changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string().min(6),
        newPassword: zod_1.z.string().min(6),
    }),
});
//# sourceMappingURL=user.validation.js.map