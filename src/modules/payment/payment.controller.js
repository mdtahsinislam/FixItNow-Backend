"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPaymentIntent = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.createPaymentIntent(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Payment intent created successfully",
        data: result,
    });
});
const confirmPayment = (0, catchAsync_1.default)(async (req, res) => {
    const { paymentIntentId } = req.body;
    const result = await payment_service_1.PaymentService.confirmPayment(paymentIntentId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Payment confirmed successfully",
        data: result,
    });
});
const getMyPayments = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.getMyPayments(req.user.userId, req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Payments retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getSinglePayment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.getSinglePayment(req.params.id, req.user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Payment retrieved successfully",
        data: result,
    });
});
exports.PaymentController = {
    createPaymentIntent,
    confirmPayment,
    getMyPayments,
    getSinglePayment,
};
//# sourceMappingURL=payment.controller.js.map