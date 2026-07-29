import { Router } from "express";
import { ServiceController } from "./service.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createServiceValidation,
  updateServiceValidation,
} from "./service.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// ============ PUBLIC ============
router.get("/", ServiceController.getAllServices);
router.get("/categories", ServiceController.getCategories);
router.get("/:id", ServiceController.getSingleService);

// ============ ADMIN ONLY ============
router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(createServiceValidation),
  ServiceController.createService
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(updateServiceValidation),
  ServiceController.updateService
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  ServiceController.deleteService
);

export const ServiceRoutes = router;