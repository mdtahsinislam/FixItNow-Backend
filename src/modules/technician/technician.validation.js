"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTechnicianStatusValidation = exports.updateTechnicianProfileValidation = void 0;
const zod_1 = require("zod");
exports.updateTechnicianProfileValidation = zod_1.z.object({
    body: zod_1.z.object({
        skills: zod_1.z.array(zod_1.z.string()).optional(),
        experience: zod_1.z.number().min(0).optional(),
        hourlyRate: zod_1.z.number().min(0).optional(),
        bio: zod_1.z.string().optional(),
        availability: zod_1.z.boolean().optional(),
    }),
});
exports.updateTechnicianStatusValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["APPROVED", "REJECTED"]),
    }),
});
//# sourceMappingURL=technician.validation.js.map