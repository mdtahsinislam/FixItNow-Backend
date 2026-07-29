import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: any, res: Response) => {
  const result = await ReviewService.createReview(req.user.userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Review submitted successfully",
    data: result,
  });
});

const getTechnicianReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getTechnicianReviews(
    req.params.technicianId,
    req.query
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Reviews retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getMyReviews = catchAsync(async (req: any, res: Response) => {
  const result = await ReviewService.getMyReviews(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "My reviews retrieved successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getTechnicianReviews,
  getMyReviews,
};