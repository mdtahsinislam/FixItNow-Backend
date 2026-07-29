import { z } from "zod";

export const createReviewValidation = z.object({
  body: z.object({
    bookingId: z.string().uuid("Invalid booking ID"),
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z.string().max(500).optional(),
  }),
});