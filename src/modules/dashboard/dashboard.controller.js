"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dashboard_service_1 = require("./dashboard.service");
const getAdminStats = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await dashboard_service_1.DashboardService.getAdminStats();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Admin dashboard stats retrieved successfully",
        data: result,
    });
});
const getRecentBookings = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await dashboard_service_1.DashboardService.getRecentBookings();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recent bookings retrieved successfully",
        data: result,
    });
});
const getRecentUsers = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await dashboard_service_1.DashboardService.getRecentUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recent users retrieved successfully",
        data: result,
    });
});
exports.DashboardController = {
    getAdminStats,
    getRecentBookings,
    getRecentUsers,
};
//# sourceMappingURL=dashboard.controller.js.map