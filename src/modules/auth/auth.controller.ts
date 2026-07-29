// // // import { Request, Response } from "express";
// // // import { AuthService } from "./auth.service";
// // // import { AuthMessages } from "./auth.constant";

// // // const register = async (req: Request, res: Response) => {
// // //   const result = await AuthService.registerUser(req.body);

// // //   res.status(201).json({
// // //     success: true,
// // //     message: AuthMessages.REGISTER_SUCCESS,
// // //     data: result,
// // //   });
// // // };

// // // const login = async (req: Request, res: Response) => {
// // //   const result = await AuthService.loginUser(req.body);

// // //   res.cookie("refreshToken", result.refreshToken, {
// // //     httpOnly: true,
// // //     secure: false,
// // //     sameSite: "lax",
// // //   });

// // //   res.status(200).json({
// // //     success: true,
// // //     message: AuthMessages.LOGIN_SUCCESS,
// // //     token: result.accessToken,
// // //     data: result.user,
// // //   });
// // // };

// // // export const AuthController = {
// // //   register,
// // //   login,
// // // };


// // //D:\FixItNow-Backend\src\modules\auth\auth.controller.ts
// // import { Request, Response } from "express";
// // import catchAsync from "../../utils/catchAsync";
// // import sendResponse from "../../utils/sendResponse";
// // import { AuthService } from "./auth.service";

// // const register = catchAsync(async (req: Request, res: Response) => {
// //   const result = await AuthService.registerUser(req.body);

// //   sendResponse(res, {
// //     success: true,
// //     statusCode: 201,
// //     message: "User registered successfully",
// //     data: result,
// //   });
// // });

// // const login = catchAsync(async (req: Request, res: Response) => {
// //   const result = await AuthService.loginUser(req.body);

// //   res.cookie("refreshToken", result.refreshToken, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //     sameSite: "lax",
// //   });

// //   sendResponse(res, {
// //     success: true,
// //     statusCode: 200,
// //     message: "Login successful",
// //     data: {
// //       accessToken: result.accessToken,
// //       user: result.user,
// //     },
// //   });
// // });

// // export const AuthController = {
// //   register,
// //   login,
// // };




// //D:\FixItNow-Backend\src\modules\auth\auth.controller.ts

// import { Request, Response } from "express";

// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";

// import { AuthService } from "./auth.service";

// const register = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthService.registerUser(req.body);

//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: "User registered successfully",
//     data: result,
//   });
// });

// const login = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthService.loginUser(req.body);

//   res.cookie("refreshToken", result.refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   });

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Login successful",
//     data: {
//       accessToken: result.accessToken,
//       user: result.user,
//     },
//   });
// });

// const logout = catchAsync(async (_req: Request, res: Response) => {
//   res.clearCookie("refreshToken");

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Logout successful",
//     data: null,
//   });
// });

// const refreshToken = catchAsync(async (_req: Request, res: Response) => {
//   /**
//    * Part-4 Final এ এখানে
//    * AuthService.refreshToken()
//    * implement করা হবে।
//    */

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Refresh Token API will be implemented",
//     data: null,
//   });
// });

// const getMe = catchAsync(async (req: any, res: Response) => {
//   /**
//    * Part-4 Final এ এখানে
//    * AuthService.getMe()
//    * implement করা হবে।
//    */

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Profile Retrieved Successfully",
//     data: req.user,
//   });
// });

// export const AuthController = {
//   register,
//   login,
//   logout,
//  refreshToken,
//   getMe,
// };       



//gork


import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  // Set refresh token in cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});

const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Logout successful",
    data: null,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Access token refreshed successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;

  const result = await AuthService.getMe(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile retrieved successfully",
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  logout,
  refreshToken,
  getMe,
};