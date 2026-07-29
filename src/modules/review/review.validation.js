"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidation = void 0;
const zod_1 = require("zod");
exports.createReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().uuid("Invalid booking ID"),
        rating: zod_1.z
            .number()
            .int()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5"),
        comment: zod_1.z.string().max(500).optional(),
    }),
});
//# sourceMappingURL=review.validation.js.map