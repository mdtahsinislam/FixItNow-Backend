import { z } from "zod";
export declare const createBookingValidation: z.ZodObject<{
    body: z.ZodObject<{
        technicianId: z.ZodString;
        serviceId: z.ZodString;
        bookingDate: z.ZodString;
        address: z.ZodString;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateBookingStatusValidation: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            REJECTED: "REJECTED";
            ACCEPTED: "ACCEPTED";
            ONGOING: "ONGOING";
            COMPLETED: "COMPLETED";
            CANCELLED: "CANCELLED";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=booking.validation.d.ts.map