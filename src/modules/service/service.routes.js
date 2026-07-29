"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// ============ PUBLIC ============
router.get("/", service_controller_1.ServiceController.getAllServices);
router.get("/categories", service_controller_1.ServiceController.getCategories);
router.get("/:id", service_controller_1.ServiceController.getSingleService);
// ============ ADMIN ONLY ============
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(service_validation_1.createServiceValidation), service_controller_1.ServiceController.createService);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(service_validation_1.updateServiceValidation), service_controller_1.ServiceController.updateService);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), service_controller_1.ServiceController.deleteService);
exports.ServiceRoutes = router;
//# sourceMappingURL=service.routes.js.map