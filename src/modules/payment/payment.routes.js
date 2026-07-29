"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Create Payment Intent (Customer)
router.post("/create", (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(payment_validation_1.createPaymentValidation), payment_controller_1.PaymentController.createPaymentIntent);
// Confirm Payment
router.post("/confirm", (0, auth_1.default)(client_1.UserRole.CUSTOMER), payment_controller_1.PaymentController.confirmPayment);
// Get My Payments
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), payment_controller_1.PaymentController.getMyPayments);
// Get Single Payment
router.get("/:id", (0, auth_1.default)(client_1.UserRole.CUSTOMER), payment_controller_1.PaymentController.getSinglePayment);
exports.PaymentRoutes = router;
//# sourceMappingURL=payment.routes.js.map