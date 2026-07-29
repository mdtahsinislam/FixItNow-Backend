// // import { PrismaClient, UserRole } from "@prisma/client";
// // import { hashPassword, comparePassword } from "../../utils/bcrypt";
// // import {
// //   generateAccessToken,
// //   generateRefreshToken,
// // } from "./auth.utils";
// // import { ILoginUser, IRegisterUser, IJwtPayload } from "./auth.interface";
// // import { AuthMessages } from "./auth.constant";

// // const prisma = new PrismaClient();

// // const registerUser = async (payload: IRegisterUser) => {
// //   // Check existing user
// //   const existingUser = await prisma.user.findUnique({
// //     where: {
// //       email: payload.email,
// //     },
// //   });

// //   if (existingUser) {
// //     throw new Error(AuthMessages.USER_EXISTS);
// //   }

// //   // Hash password
// //   const hashedPassword = await hashPassword(payload.password);

// //   // Create user
// //   const user = await prisma.user.create({
// //     data: {
// //       name: payload.name,
// //       email: payload.email,
// //       password: hashedPassword,
// //       phone: payload.phone,
// //       address: payload.address,
// //       role: UserRole.CUSTOMER,
// //     },
// //   });

// //   // JWT Payload
// //   const jwtPayload: IJwtPayload = {
// //     userId: user.id,
// //     email: user.email,
// //     role: user.role,
// //   };

// //   // Generate Tokens
// //   const accessToken = generateAccessToken(jwtPayload);

// //   const refreshToken = generateRefreshToken(jwtPayload);

// //   // Remove password
// //   const { password, ...userData } = user;

// //   return {
// //     accessToken,
// //     refreshToken,
// //     user: userData,
// //   };
// // };



// //D:\FixItNow-Backend\src\modules\auth\auth.service.ts


// import { prisma } from "../../config/prisma";

// import {
//   comparePassword,
//   hashPassword,
// } from "../../utils/bcrypt";

// import {
//   generateAccessToken,
//   generateRefreshToken,
// } from "./auth.utils";

// import {
//   ILoginUser,
//   IRegisterUser,
// } from "./auth.interface";

// import {
//   AuthMessages,
// } from "./auth.constant";

// import { UserRole } from "@prisma/client";



// // ================================
// // REGISTER USER
// // ================================

// const registerUser = async (
//   payload: IRegisterUser
// ) => {


//   const existingUser =
//     await prisma.user.findUnique({
//       where:{
//         email: payload.email,
//       },
//     });



//   if(existingUser){

//     throw new Error(
//       AuthMessages.USER_EXISTS
//     );

//   }



//   const hashedPassword =
//     await hashPassword(
//       payload.password
//     );



//   const user =
//     await prisma.user.create({

//       data:{

//         name: payload.name,

//         email: payload.email,

//         password: hashedPassword,

//         phone: payload.phone,

//         address: payload.address,

//         role: UserRole.CUSTOMER,

//       },


//       select:{

//         id:true,

//         name:true,

//         email:true,

//         phone:true,

//         address:true,

//         role:true,

//         createdAt:true,

//       },


//     });



//   return user;

// };





// // ================================
// // LOGIN USER
// // ================================

// const loginUser = async (
//   payload: ILoginUser
// ) => {


//   const user =
//     await prisma.user.findUnique({

//       where:{
//         email: payload.email,
//       },

//     });



//   if(!user){

//     throw new Error(
//       AuthMessages.INVALID_CREDENTIALS
//     );

//   }





//   const isPasswordMatched =
//     await comparePassword(

//       payload.password,

//       user.password

//     );




//   if(!isPasswordMatched){

//     throw new Error(
//       AuthMessages.INVALID_CREDENTIALS
//     );

//   }





//   const jwtPayload = {

//     userId:user.id,

//     email:user.email,

//     role:user.role,

//   };





//   const accessToken =
//     generateAccessToken(
//       jwtPayload
//     );



//   const refreshToken =
//     generateRefreshToken(
//       jwtPayload
//     );






//   return {


//     accessToken,


//     refreshToken,


//     user:{

//       id:user.id,

//       name:user.name,

//       email:user.email,

//       role:user.role,

//       phone:user.phone,

//       address:user.address,

//     },


//   };


// };





// export const AuthService = {

//   registerUser,

//   loginUser,

// };











////Bismillah gork

import { prisma } from "../../config/prisma";
import {
  comparePassword,
  hashPassword,
} from "../../utils/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./auth.utils";
import {
  ILoginUser,
  IRegisterUser,
  IJwtPayload,
} from "./auth.interface";
import { AuthMessages } from "./auth.constant";
import { UserRole } from "@prisma/client";
import AppError from "../../utils/AppError";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

// ================================
// REGISTER USER
// ================================
const registerUser = async (payload: IRegisterUser) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(409, AuthMessages.USER_EXISTS);
  }

  // Role can be CUSTOMER or TECHNICIAN only
  const role =
    payload.role === "TECHNICIAN"
      ? UserRole.TECHNICIAN
      : UserRole.CUSTOMER;

  const hashedPassword = await hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      address: payload.address,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });

  // If user registered as TECHNICIAN → create technician profile
  if (role === UserRole.TECHNICIAN) {
    await prisma.technician.create({
      data: {
        userId: user.id,
        skills: [],
        status: "PENDING",
      },
    });
  }

  return user;
};

// ================================
// LOGIN USER
// ================================
const loginUser = async (payload: ILoginUser) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(401, AuthMessages.INVALID_CREDENTIALS);
  }

  if (!user.isActive) {
    throw new AppError(403, "Your account has been deactivated");
  }

  const isPasswordMatched = await comparePassword(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, AuthMessages.INVALID_CREDENTIALS);
  }

  const jwtPayload: IJwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(jwtPayload);
  const refreshToken = generateRefreshToken(jwtPayload);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  };
};

// ================================
// REFRESH TOKEN
// ================================
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(401, "Refresh token is required");
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, env.jwt.refreshSecret);
  } catch (error) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || !user.isActive) {
    throw new AppError(401, "User not found or inactive");
  }

  const jwtPayload: IJwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(jwtPayload);

  return {
    accessToken,
  };
};

// ================================
// GET ME
// ================================
const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      profileImage: true,
      isActive: true,
      createdAt: true,
      technician: {
        select: {
          id: true,
          skills: true,
          experience: true,
          hourlyRate: true,
          bio: true,
          status: true,
          availability: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError(404, AuthMessages.USER_NOT_FOUND);
  }

  return user;
};

// ================================
// LOGOUT (mostly handled in controller)
// ================================
const logout = async () => {
  return null;
};

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
  getMe,
  logout,
};




























