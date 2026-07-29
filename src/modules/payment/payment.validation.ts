import { z } from "zod";

export const createPaymentValidation = z.object({
  body: z.object({
    bookingId: z.string().uuid("Invalid booking ID"),
  }),
});