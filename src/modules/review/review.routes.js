"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Create Review (Customer only)
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(review_validation_1.createReviewValidation), review_controller_1.ReviewController.createReview);
// Get My Reviews
router.get("/my-reviews", (0, auth_1.default)(client_1.UserRole.CUSTOMER), review_controller_1.ReviewController.getMyReviews);
// Get Reviews of a Technician (Public)
router.get("/technician/:technicianId", review_controller_1.ReviewController.getTechnicianReviews);
exports.ReviewRoutes = router;
//# sourceMappingURL=review.routes.js.map