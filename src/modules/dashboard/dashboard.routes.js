"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// All dashboard routes are Admin only
router.use((0, auth_1.default)(client_1.UserRole.ADMIN));
router.get("/stats", dashboard_controller_1.DashboardController.getAdminStats);
router.get("/recent-bookings", dashboard_controller_1.DashboardController.getRecentBookings);
router.get("/recent-users", dashboard_controller_1.DashboardController.getRecentUsers);
exports.DashboardRoutes = router;
//# sourceMappingURL=dashboard.routes.js.map