"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const getMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getMyProfile(req.user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Profile retrieved successfully",
        data: result,
    });
});
const updateProfile = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.updateProfile(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Profile updated successfully",
        data: result,
    });
});
const changePassword = (0, catchAsync_1.default)(async (req, res) => {
    await user_service_1.UserService.changePassword(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Password changed successfully",
        data: null,
    });
});
// ============ ADMIN ============
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getAllUsers(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const updateUserStatus = (0, catchAsync_1.default)(async (req, res) => {
    const { isActive } = req.body;
    const result = await user_service_1.UserService.updateUserStatus(req.params.id, isActive);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: isActive ? "User unbanned successfully" : "User banned successfully",
        data: result,
    });
});
exports.UserController = {
    getMyProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    updateUserStatus,
};
//# sourceMappingURL=user.controller.js.map