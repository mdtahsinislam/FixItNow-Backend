import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getMyProfile = catchAsync(async (req: any, res: Response) => {
  const result = await UserService.getMyProfile(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: any, res: Response) => {
  const result = await UserService.updateProfile(req.user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: any, res: Response) => {
  await UserService.changePassword(req.user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
    data: null,
  });
});

// ============ ADMIN ============
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { isActive } = req.body;
  const result = await UserService.updateUserStatus(req.params.id, isActive);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: isActive ? "User unbanned successfully" : "User banned successfully",
    data: result,
  });
});

export const UserController = {
  getMyProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserStatus,
};