import { Router } from "express";
import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createPaymentValidation } from "./payment.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// Create Payment Intent (Customer)
router.post(
  "/create",
  auth(UserRole.CUSTOMER),
  validateRequest(createPaymentValidation),
  PaymentController.createPaymentIntent
);

// Confirm Payment
router.post(
  "/confirm",
  auth(UserRole.CUSTOMER),
  PaymentController.confirmPayment
);

// Get My Payments
router.get(
  "/",
  auth(UserRole.CUSTOMER),
  PaymentController.getMyPayments
);

// Get Single Payment
router.get(
  "/:id",
  auth(UserRole.CUSTOMER),
  PaymentController.getSinglePayment
);

export const PaymentRoutes = router;