import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import {
  IUpdateTechnicianProfile,
  IUpdateTechnicianStatus,
} from "./technician.interface";
import { TechnicianMessages } from "./technician.constant";

// ================================
// GET MY TECHNICIAN PROFILE
// ================================
const getMyProfile = async (userId: string) => {
  const technician = await prisma.technician.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          profileImage: true,
        },
      },
    },
  });

  if (!technician) {
    throw new AppError(404, TechnicianMessages.PROFILE_NOT_FOUND);
  }

  return technician;
};

// ================================
// UPDATE MY PROFILE
// ================================
const updateMyProfile = async (
  userId: string,
  payload: IUpdateTechnicianProfile
) => {
  const technician = await prisma.technician.findUnique({
    where: { userId },
  });

  if (!technician) {
    throw new AppError(404, TechnicianMessages.PROFILE_NOT_FOUND);
  }

  const updated = await prisma.technician.update({
    where: { userId },
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return updated;
};

// ================================
// GET ALL TECHNICIANS (Public + Admin)
// ================================
const getAllTechnicians = async (query: any) => {
  const {
    status,
    availability,
    search,
    page = 1,
    limit = 10,
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  // Public users can only see APPROVED technicians
  if (status) {
    where.status = status;
  } else {
    // Default for public: only approved
    where.status = "APPROVED";
  }

  if (availability !== undefined) {
    where.availability = availability === "true" || availability === true;
  }

  if (search) {
    where.OR = [
      { user: { name: { contains: search, mode: "insensitive" } } },
      { skills: { has: search } },
      { bio: { contains: search, mode: "insensitive" } },
    ];
  }

  const [technicians, total] = await Promise.all([
    prisma.technician.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.technician.count({ where }),
  ]);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: technicians,
  };
};

// ================================
// GET SINGLE TECHNICIAN (Public)
// ================================
const getSingleTechnician = async (id: string) => {
  const technician = await prisma.technician.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
          address: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          customer: {
            select: {
              id: true,
              name: true,
              profileImage: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!technician) {
    throw new AppError(404, TechnicianMessages.PROFILE_NOT_FOUND);
  }

  return technician;
};

// ================================
// ADMIN → UPDATE TECHNICIAN STATUS
// ================================
const updateTechnicianStatus = async (
  id: string,
  payload: IUpdateTechnicianStatus
) => {
  const technician = await prisma.technician.findUnique({
    where: { id },
  });

  if (!technician) {
    throw new AppError(404, TechnicianMessages.PROFILE_NOT_FOUND);
  }

  const updated = await prisma.technician.update({
    where: { id },
    data: { status: payload.status },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return updated;
};

// ================================
// ADMIN → GET PENDING TECHNICIANS
// ================================
const getPendingTechnicians = async () => {
  const technicians = await prisma.technician.findMany({
    where: { status: "PENDING" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return technicians;
};

export const TechnicianService = {
  getMyProfile,
  updateMyProfile,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianStatus,
  getPendingTechnicians,
};