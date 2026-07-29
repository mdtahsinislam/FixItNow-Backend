import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { IChangePassword, IUpdateProfile } from "./user.interface";
import { UserMessages } from "./user.constant";

// ================================
// GET MY PROFILE
// ================================
const getMyProfile = async (userId: string) => {
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
    throw new AppError(404, UserMessages.USER_NOT_FOUND);
  }

  return user;
};

// ================================
// UPDATE PROFILE
// ================================
const updateProfile = async (userId: string, payload: IUpdateProfile) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      profileImage: true,
      isActive: true,
      updatedAt: true,
    },
  });

  return user;
};

// ================================
// CHANGE PASSWORD
// ================================
const changePassword = async (userId: string, payload: IChangePassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, UserMessages.USER_NOT_FOUND);
  }

  const isMatch = await comparePassword(payload.oldPassword, user.password);

  if (!isMatch) {
    throw new AppError(400, UserMessages.INCORRECT_PASSWORD);
  }

  const hashed = await hashPassword(payload.newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });

  return null;
};

// ================================
// ADMIN → GET ALL USERS
// ================================
const getAllUsers = async (query: any) => {
  const { role, search, page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (role) where.role = role;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: Number(limit),
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: users,
  };
};

// ================================
// ADMIN → BAN / UNBAN USER
// ================================
const updateUserStatus = async (userId: string, isActive: boolean) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, UserMessages.USER_NOT_FOUND);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { isActive },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  return updated;
};

export const UserService = {
  getMyProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserStatus,
};