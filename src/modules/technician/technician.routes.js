"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianRoutes = void 0;
const express_1 = require("express");
const technician_controller_1 = require("./technician.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const technician_validation_1 = require("./technician.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// ============ PUBLIC ============
router.get("/", technician_controller_1.TechnicianController.getAllTechnicians);
router.get("/:id", technician_controller_1.TechnicianController.getSingleTechnician);
// ============ TECHNICIAN ============
router.get("/profile/me", (0, auth_1.default)(client_1.UserRole.TECHNICIAN), technician_controller_1.TechnicianController.getMyProfile);
router.patch("/profile/me", (0, auth_1.default)(client_1.UserRole.TECHNICIAN), (0, validateRequest_1.default)(technician_validation_1.updateTechnicianProfileValidation), technician_controller_1.TechnicianController.updateMyProfile);
// ============ ADMIN ============
router.get("/admin/pending", (0, auth_1.default)(client_1.UserRole.ADMIN), technician_controller_1.TechnicianController.getPendingTechnicians);
router.patch("/admin/:id/status", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(technician_validation_1.updateTechnicianStatusValidation), technician_controller_1.TechnicianController.updateTechnicianStatus);
exports.TechnicianRoutes = router;
//# sourceMappingURL=technician.routes.js.map