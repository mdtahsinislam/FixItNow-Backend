"use strict";
// // // import { Request, Response } from "express";
// // // import { AuthService } from "./auth.service";
// // // import { AuthMessages } from "./auth.constant";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
// // // const register = async (req: Request, res: Response) => {
// // //   const result = await AuthService.registerUser(req.body);
// // //   res.status(201).json({
// // //     success: true,
// // //     message: AuthMessages.REGISTER_SUCCESS,
// // //     data: result,
// // //   });
// // // };
// // // const login = async (req: Request, res: Response) => {
// // //   const result = await AuthService.loginUser(req.body);
// // //   res.cookie("refreshToken", result.refreshToken, {
// // //     httpOnly: true,
// // //     secure: false,
// // //     sameSite: "lax",
// // //   });
// // //   res.status(200).json({
// // //     success: true,
// // //     message: AuthMessages.LOGIN_SUCCESS,
// // //     token: result.accessToken,
// // //     data: result.user,
// // //   });
// // // };
// // // export const AuthController = {
// // //   register,
// // //   login,
// // // };
// // //D:\FixItNow-Backend\src\modules\auth\auth.controller.ts
// // import { Request, Response } from "express";
// // import catchAsync from "../../utils/catchAsync";
// // import sendResponse from "../../utils/sendResponse";
// // import { AuthService } from "./auth.service";
// // const register = catchAsync(async (req: Request, res: Response) => {
// //   const result = await AuthService.registerUser(req.body);
// //   sendResponse(res, {
// //     success: true,
// //     statusCode: 201,
// //     message: "User registered successfully",
// //     data: result,
// //   });
// // });
// // const login = catchAsync(async (req: Request, res: Response) => {
// //   const result = await AuthService.loginUser(req.body);
// //   res.cookie("refreshToken", result.refreshToken, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //     sameSite: "lax",
// //   });
// //   sendResponse(res, {
// //     success: true,
// //     statusCode: 200,
// //     message: "Login successful",
// //     data: {
// //       accessToken: result.accessToken,
// //       user: result.user,
// //     },
// //   });
// // });
// // export const AuthController = {
// //   register,
// //   login,
// // };
// //D:\FixItNow-Backend\src\modules\auth\auth.controller.ts
// import { Request, Response } from "express";
// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import { AuthService } from "./auth.service";
// const register = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthService.registerUser(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: "User registered successfully",
//     data: result,
//   });
// });
// const login = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthService.loginUser(req.body);
//   res.cookie("refreshToken", result.refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   });
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Login successful",
//     data: {
//       accessToken: result.accessToken,
//       user: result.user,
//     },
//   });
// });
// const logout = catchAsync(async (_req: Request, res: Response) => {
//   res.clearCookie("refreshToken");
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Logout successful",
//     data: null,
//   });
// });
// const refreshToken = catchAsync(async (_req: Request, res: Response) => {
//   /**
//    * Part-4 Final এ এখানে
//    * AuthService.refreshToken()
//    * implement করা হবে।
//    */
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Refresh Token API will be implemented",
//     data: null,
//   });
// });
// const getMe = catchAsync(async (req: any, res: Response) => {
//   /**
//    * Part-4 Final এ এখানে
//    * AuthService.getMe()
//    * implement করা হবে।
//    */
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Profile Retrieved Successfully",
//     data: req.user,
//   });
// });
// export const AuthController = {
//   register,
//   login,
//   logout,
//  refreshToken,
//   getMe,
// };       
//gork
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const register = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: result,
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    // Set refresh token in cookie
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: {
            accessToken: result.accessToken,
            user: result.user,
        },
    });
});
const logout = (0, catchAsync_1.default)(async (_req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Logout successful",
        data: null,
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await auth_service_1.AuthService.refreshToken(token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Access token refreshed successfully",
        data: result,
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await auth_service_1.AuthService.getMe(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Profile retrieved successfully",
        data: result,
    });
});
exports.AuthController = {
    register,
    login,
    logout,
    refreshToken,
    getMe,
};
//# sourceMappingURL=auth.controller.js.map