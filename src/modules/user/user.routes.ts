import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  updateProfileValidation,
  changePasswordValidation,
} from "./user.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// ============ USER ROUTES ============
router.get("/me", auth(), UserController.getMyProfile);

router.patch(
  "/update-profile",
  auth(),
  validateRequest(updateProfileValidation),
  UserController.updateProfile
);

router.patch(
  "/change-password",
  auth(),
  validateRequest(changePasswordValidation),
  UserController.changePassword
);

// ============ ADMIN ROUTES ============
router.get(
  "/",
  auth(UserRole.ADMIN),
  UserController.getAllUsers
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus
);

export const UserRoutes = router;