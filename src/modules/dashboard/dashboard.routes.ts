import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// All dashboard routes are Admin only
router.use(auth(UserRole.ADMIN));

router.get("/stats", DashboardController.getAdminStats);
router.get("/recent-bookings", DashboardController.getRecentBookings);
router.get("/recent-users", DashboardController.getRecentUsers);

export const DashboardRoutes = router;