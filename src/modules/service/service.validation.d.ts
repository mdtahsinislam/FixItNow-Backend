import { z } from "zod";
export declare const createServiceValidation: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        category: z.ZodString;
        price: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateServiceValidation: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        image: z.ZodOptional<z.ZodString>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=service.validation.d.ts.map