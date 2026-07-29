import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPaymentIntent = catchAsync(async (req: any, res: Response) => {
  const result = await PaymentService.createPaymentIntent(
    req.user.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment intent created successfully",
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentIntentId } = req.body;

  const result = await PaymentService.confirmPayment(paymentIntentId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment confirmed successfully",
    data: result,
  });
});

const getMyPayments = catchAsync(async (req: any, res: Response) => {
  const result = await PaymentService.getMyPayments(req.user.userId, req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payments retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePayment = catchAsync(async (req: any, res: Response) => {
  const result = await PaymentService.getSinglePayment(
    req.params.id,
    req.user.userId
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment retrieved successfully",
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};