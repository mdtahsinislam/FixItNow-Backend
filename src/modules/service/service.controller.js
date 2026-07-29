"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_service_1 = require("./service.service");
const createService = (0, catchAsync_1.default)(async (req, res) => {
    const result = await service_service_1.ServiceService.createService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Service created successfully",
        data: result,
    });
});
const getAllServices = (0, catchAsync_1.default)(async (req, res) => {
    const result = await service_service_1.ServiceService.getAllServices(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Services retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getSingleService = (0, catchAsync_1.default)(async (req, res) => {
    const result = await service_service_1.ServiceService.getSingleService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Service retrieved successfully",
        data: result,
    });
});
const updateService = (0, catchAsync_1.default)(async (req, res) => {
    const result = await service_service_1.ServiceService.updateService(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Service updated successfully",
        data: result,
    });
});
const deleteService = (0, catchAsync_1.default)(async (req, res) => {
    const result = await service_service_1.ServiceService.deleteService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Service deleted successfully",
        data: result,
    });
});
const getCategories = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await service_service_1.ServiceService.getCategories();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: result,
    });
});
exports.ServiceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
    getCategories,
};
//# sourceMappingURL=service.controller.js.map