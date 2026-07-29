import { z } from "zod";

export const createBookingValidation = z.object({
  body: z.object({
    technicianId: z.string().uuid("Invalid technician ID"),
    serviceId: z.string().uuid("Invalid service ID"),
    bookingDate: z.string().datetime({ message: "Invalid booking date" }),
    address: z.string().min(5, "Address is required"),
    note: z.string().optional(),
  }),
});

export const updateBookingStatusValidation = z.object({
  body: z.object({
    status: z.enum([
      "ACCEPTED",
      "REJECTED",
      "ONGOING",
      "COMPLETED",
      "CANCELLED",
    ]),
  }),
});