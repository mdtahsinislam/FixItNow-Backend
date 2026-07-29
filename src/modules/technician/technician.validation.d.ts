import { z } from "zod";
export declare const updateTechnicianProfileValidation: z.ZodObject<{
    body: z.ZodObject<{
        skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
        experience: z.ZodOptional<z.ZodNumber>;
        hourlyRate: z.ZodOptional<z.ZodNumber>;
        bio: z.ZodOptional<z.ZodString>;
        availability: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateTechnicianStatusValidation: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            APPROVED: "APPROVED";
            REJECTED: "REJECTED";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=technician.validation.d.ts.map