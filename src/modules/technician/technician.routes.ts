import { Router } from "express";
import { TechnicianController } from "./technician.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  updateTechnicianProfileValidation,
  updateTechnicianStatusValidation,
} from "./technician.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// ============ PUBLIC ============
router.get("/", TechnicianController.getAllTechnicians);
router.get("/:id", TechnicianController.getSingleTechnician);

// ============ TECHNICIAN ============
router.get(
  "/profile/me",
  auth(UserRole.TECHNICIAN),
  TechnicianController.getMyProfile
);

router.patch(
  "/profile/me",
  auth(UserRole.TECHNICIAN),
  validateRequest(updateTechnicianProfileValidation),
  TechnicianController.updateMyProfile
);

// ============ ADMIN ============
router.get(
  "/admin/pending",
  auth(UserRole.ADMIN),
  TechnicianController.getPendingTechnicians
);

router.patch(
  "/admin/:id/status",
  auth(UserRole.ADMIN),
  validateRequest(updateTechnicianStatusValidation),
  TechnicianController.updateTechnicianStatus
);

export const TechnicianRoutes = router;