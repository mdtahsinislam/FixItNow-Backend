"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// ============ CUSTOMER ============
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(booking_validation_1.createBookingValidation), booking_controller_1.BookingController.createBooking);
// ============ COMMON (Customer + Technician) ============
router.get("/my-bookings", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.TECHNICIAN), booking_controller_1.BookingController.getMyBookings);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.TECHNICIAN, client_1.UserRole.ADMIN), booking_controller_1.BookingController.getSingleBooking);
router.patch("/:id/status", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.TECHNICIAN), (0, validateRequest_1.default)(booking_validation_1.updateBookingStatusValidation), booking_controller_1.BookingController.updateBookingStatus);
// ============ ADMIN ============
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), booking_controller_1.BookingController.getAllBookings);
exports.BookingRoutes = router;
//# sourceMappingURL=booking.routes.js.map