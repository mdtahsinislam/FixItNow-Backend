import { z } from "zod";
export declare const createReviewValidation: z.ZodObject<{
    body: z.ZodObject<{
        bookingId: z.ZodString;
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=review.validation.d.ts.map