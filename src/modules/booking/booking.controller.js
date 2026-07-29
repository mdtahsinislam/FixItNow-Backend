"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.createBooking(req.user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Booking created successfully",
        data: result,
    });
});
const getMyBookings = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.getMyBookings(req.user.userId, req.user.role, req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getSingleBooking = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.getSingleBooking(req.params.id, req.user.userId, req.user.role);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Booking retrieved successfully",
        data: result,
    });
});
const updateBookingStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.updateBookingStatus(req.params.id, req.user.userId, req.user.role, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Booking status updated successfully",
        data: result,
    });
});
// Admin
const getAllBookings = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booking_service_1.BookingService.getAllBookings(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "All bookings retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
exports.BookingController = {
    createBooking,
    getMyBookings,
    getSingleBooking,
    updateBookingStatus,
    getAllBookings,
};
//# sourceMappingURL=booking.controller.js.map