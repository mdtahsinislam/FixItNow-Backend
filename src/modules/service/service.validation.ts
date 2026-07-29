import { z } from "zod";

export const createServiceValidation = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(2, "Category is required"),
    price: z.number().min(0, "Price must be a positive number"),
    image: z.string().url().optional(),
  }),
});

export const updateServiceValidation = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    category: z.string().min(2).optional(),
    price: z.number().min(0).optional(),
    image: z.string().url().optional(),
    isActive: z.boolean().optional(),
  }),
});