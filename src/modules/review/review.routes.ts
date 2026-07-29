import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createReviewValidation } from "./review.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// Create Review (Customer only)
router.post(
  "/",
  auth(UserRole.CUSTOMER),
  validateRequest(createReviewValidation),
  ReviewController.createReview
);

// Get My Reviews
router.get(
  "/my-reviews",
  auth(UserRole.CUSTOMER),
  ReviewController.getMyReviews
);

// Get Reviews of a Technician (Public)
router.get(
  "/technician/:technicianId",
  ReviewController.getTechnicianReviews
);

export const ReviewRoutes = router;