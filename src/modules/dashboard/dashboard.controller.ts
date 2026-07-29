import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";

const getAdminStats = catchAsync(async (_req: Request, res: Response) => {
  const result = await DashboardService.getAdminStats();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin dashboard stats retrieved successfully",
    data: result,
  });
});

const getRecentBookings = catchAsync(async (_req: Request, res: Response) => {
  const result = await DashboardService.getRecentBookings();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recent bookings retrieved successfully",
    data: result,
  });
});

const getRecentUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await DashboardService.getRecentUsers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Recent users retrieved successfully",
    data: result,
  });
});

export const DashboardController = {
  getAdminStats,
  getRecentBookings,
  getRecentUsers,
};