"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatusValidation = exports.createBookingValidation = void 0;
const zod_1 = require("zod");
exports.createBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        technicianId: zod_1.z.string().uuid("Invalid technician ID"),
        serviceId: zod_1.z.string().uuid("Invalid service ID"),
        bookingDate: zod_1.z.string().datetime({ message: "Invalid booking date" }),
        address: zod_1.z.string().min(5, "Address is required"),
        note: zod_1.z.string().optional(),
    }),
});
exports.updateBookingStatusValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            "ACCEPTED",
            "REJECTED",
            "ONGOING",
            "COMPLETED",
            "CANCELLED",
        ]),
    }),
});
//# sourceMappingURL=booking.validation.js.map