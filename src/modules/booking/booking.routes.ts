import { Router } from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createBookingValidation,
  updateBookingStatusValidation,
} from "./booking.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// ============ CUSTOMER ============
router.post(
  "/",
  auth(UserRole.CUSTOMER),
  validateRequest(createBookingValidation),
  BookingController.createBooking
);

// ============ COMMON (Customer + Technician) ============
router.get(
  "/my-bookings",
  auth(UserRole.CUSTOMER, UserRole.TECHNICIAN),
  BookingController.getMyBookings
);

router.get(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.TECHNICIAN, UserRole.ADMIN),
  BookingController.getSingleBooking
);

router.patch(
  "/:id/status",
  auth(UserRole.CUSTOMER, UserRole.TECHNICIAN),
  validateRequest(updateBookingStatusValidation),
  BookingController.updateBookingStatus
);

// ============ ADMIN ============
router.get(
  "/",
  auth(UserRole.ADMIN),
  BookingController.getAllBookings
);

export const BookingRoutes = router;