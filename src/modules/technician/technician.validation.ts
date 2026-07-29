import { z } from "zod";

export const updateTechnicianProfileValidation = z.object({
  body: z.object({
    skills: z.array(z.string()).optional(),
    experience: z.number().min(0).optional(),
    hourlyRate: z.number().min(0).optional(),
    bio: z.string().optional(),
    availability: z.boolean().optional(),
  }),
});

export const updateTechnicianStatusValidation = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
  }),
});