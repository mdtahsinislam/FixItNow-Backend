import { z } from "zod";
export declare const updateProfileValidation: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        profileImage: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const changePasswordValidation: z.ZodObject<{
    body: z.ZodObject<{
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=user.validation.d.ts.map