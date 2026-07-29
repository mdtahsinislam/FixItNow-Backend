"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const technician_service_1 = require("./technician.service");
const getMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const result = await technician_service_1.TechnicianService.getMyProfile(req.user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Technician profile retrieved successfully",
        data: result,
    });
});
const updateMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const result = await technician_service_1.TechnicianService.updateMyProfile(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Technician profile updated successfully",
        data: result,
    });
});
const getAllTechnicians = (0, catchAsync_1.default)(async (req, res) => {
    const result = await technician_service_1.TechnicianService.getAllTechnicians(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Technicians retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getSingleTechnician = (0, catchAsync_1.default)(async (req, res) => {
    const result = await technician_service_1.TechnicianService.getSingleTechnician(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Technician details retrieved successfully",
        data: result,
    });
});
// ============ ADMIN ============
const updateTechnicianStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await technician_service_1.TechnicianService.updateTechnicianStatus(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Technician status updated successfully",
        data: result,
    });
});
const getPendingTechnicians = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await technician_service_1.TechnicianService.getPendingTechnicians();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Pending technicians retrieved successfully",
        data: result,
    });
});
exports.TechnicianController = {
    getMyProfile,
    updateMyProfile,
    getAllTechnicians,
    getSingleTechnician,
    updateTechnicianStatus,
    getPendingTechnicians,
};
//# sourceMappingURL=technician.controller.js.map