import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceService } from "./service.service";

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.createService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getAllServices(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Services retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getSingleService(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.updateService(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.deleteService(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service deleted successfully",
    data: result,
  });
});

const getCategories = catchAsync(async (_req: Request, res: Response) => {
  const result = await ServiceService.getCategories();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  getCategories,
};