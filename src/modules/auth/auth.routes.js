"use strict";
// // import { Router } from "express";
// // import { AuthController } from "./auth.controller";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
// // const router = Router();
// // router.post("/register", AuthController.register);
// // router.post("/login", AuthController.login);
// // export const AuthRoutes = router;
// // import { Router } from "express";
// // import { AuthController } from "./auth.controller";
// // import validateRequest from "../../middlewares/validateRequest";
// // import {
// //   registerValidation,
// //   loginValidation,
// // } from "./auth.validation";
// // const router = Router();
// // router.post(
// //   "/register",
// //   validateRequest(registerValidation),
// //   AuthController.register
// // );
// // router.post(
// //   "/login",
// //   validateRequest(loginValidation),
// //   AuthController.login
// // );
// // export const AuthRoutes = router;
// //D:\FixItNow-Backend\src\modules\auth\auth.routes.ts
// import { Router } from "express";
// import { AuthController } from "./auth.controller";
// import validateRequest from "../../middlewares/validateRequest";
// import auth from "../../middlewares/auth";
// import {
//   registerValidation,
//   loginValidation,
// } from "./auth.validation";
// const router = Router();
// router.post(
//   "/register",
//   validateRequest(registerValidation),
//   AuthController.register
// );
// router.post(
//   "/login",
//   validateRequest(loginValidation),
//   AuthController.login
// );
// router.post(
//   "/logout",
//   auth(),
//   AuthController.logout
// );
// router.post(
//   "/refresh-token",
//   AuthController.refreshToken
// );
// router.get(
//   "/me",
//   auth(),
//   AuthController.getMe
// );
// export const AuthRoutes = router;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.registerValidation), auth_controller_1.AuthController.register);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginValidation), auth_controller_1.AuthController.login);
router.post("/logout", (0, auth_1.default)(), auth_controller_1.AuthController.logout);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
router.get("/me", (0, auth_1.default)(), auth_controller_1.AuthController.getMe);
exports.AuthRoutes = router;
//# sourceMappingURL=auth.routes.js.map