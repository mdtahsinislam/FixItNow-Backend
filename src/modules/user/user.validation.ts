import { z } from "zod";

export const updateProfileValidation = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().url().optional(),
  }),
});

export const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});