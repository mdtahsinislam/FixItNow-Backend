"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const review_service_1 = require("./review.service");
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const result = await review_service_1.ReviewService.createReview(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Review submitted successfully",
        data: result,
    });
});
const getTechnicianReviews = (0, catchAsync_1.default)(async (req, res) => {
    const result = await review_service_1.ReviewService.getTechnicianReviews(req.params.technicianId, req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Reviews retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getMyReviews = (0, catchAsync_1.default)(async (req, res) => {
    const result = await review_service_1.ReviewService.getMyReviews(req.user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "My reviews retrieved successfully",
        data: result,
    });
});
exports.ReviewController = {
    createReview,
    getTechnicianReviews,
    getMyReviews,
};
//# sourceMappingURL=review.controller.js.map