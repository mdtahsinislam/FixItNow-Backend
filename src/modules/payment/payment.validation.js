"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentValidation = void 0;
const zod_1 = require("zod");
exports.createPaymentValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().uuid("Invalid booking ID"),
    }),
});
//# sourceMappingURL=payment.validation.js.map