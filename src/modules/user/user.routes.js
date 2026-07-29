"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// ============ USER ROUTES ============
router.get("/me", (0, auth_1.default)(), user_controller_1.UserController.getMyProfile);
router.patch("/update-profile", (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.updateProfileValidation), user_controller_1.UserController.updateProfile);
router.patch("/change-password", (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.changePasswordValidation), user_controller_1.UserController.changePassword);
// ============ ADMIN ROUTES ============
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.getAllUsers);
router.patch("/:id/status", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.updateUserStatus);
exports.UserRoutes = router;
//# sourceMappingURL=user.routes.js.map