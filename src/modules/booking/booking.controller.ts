import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.createBooking(req.user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Booking created successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.getMyBookings(
    req.user.userId,
    req.user.role,
    req.query
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBooking = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.getSingleBooking(
    req.params.id,
    req.user.userId,
    req.user.role
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: any, res: Response) => {
  const result = await BookingService.updateBookingStatus(
    req.params.id,
    req.user.userId,
    req.user.role,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking status updated successfully",
    data: result,
  });
});

// Admin
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All bookings retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const BookingController = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  updateBookingStatus,
  getAllBookings,
};