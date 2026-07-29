import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TechnicianService } from "./technician.service";

const getMyProfile = catchAsync(async (req: any, res: Response) => {
  const result = await TechnicianService.getMyProfile(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Technician profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: any, res: Response) => {
  const result = await TechnicianService.updateMyProfile(
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Technician profile updated successfully",
    data: result,
  });
});

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.getAllTechnicians(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Technicians retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTechnician = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.getSingleTechnician(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Technician details retrieved successfully",
    data: result,
  });
});

// ============ ADMIN ============
const updateTechnicianStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TechnicianService.updateTechnicianStatus(
      req.params.id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Technician status updated successfully",
      data: result,
    });
  }
);

const getPendingTechnicians = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await TechnicianService.getPendingTechnicians();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Pending technicians retrieved successfully",
      data: result,
    });
  }
);

export const TechnicianController = {
  getMyProfile,
  updateMyProfile,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianStatus,
  getPendingTechnicians,
};