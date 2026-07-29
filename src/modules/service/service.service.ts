import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import { ICreateService, IUpdateService } from "./service.interface";
import { ServiceMessages } from "./service.constant";

// ================================
// CREATE SERVICE (Admin)
// ================================
const createService = async (payload: ICreateService) => {
  const existing = await prisma.service.findFirst({
    where: {
      title: {
        equals: payload.title,
        mode: "insensitive",
      },
    },
  });

  if (existing) {
    throw new AppError(409, ServiceMessages.ALREADY_EXISTS);
  }

  const service = await prisma.service.create({
    data: payload,
  });

  return service;
};

// ================================
// GET ALL SERVICES (Public + Filter)
// ================================
const getAllServices = async (query: any) => {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    isActive,
    page = 1,
    limit = 10,
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  // Public by default only active services
  if (isActive !== undefined) {
    where.isActive = isActive === "true" || isActive === true;
  } else {
    where.isActive = true;
  }

  if (category) {
    where.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.count({ where }),
  ]);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: services,
  };
};

// ================================
// GET SINGLE SERVICE
// ================================
const getSingleService = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    throw new AppError(404, ServiceMessages.NOT_FOUND);
  }

  return service;
};

// ================================
// UPDATE SERVICE (Admin)
// ================================
const updateService = async (id: string, payload: IUpdateService) => {
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    throw new AppError(404, ServiceMessages.NOT_FOUND);
  }

  const updated = await prisma.service.update({
    where: { id },
    data: payload,
  });

  return updated;
};

// ================================
// DELETE SERVICE (Admin) - Soft delete
// ================================
const deleteService = async (id: string) => {
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    throw new AppError(404, ServiceMessages.NOT_FOUND);
  }

  // Soft delete
  const deleted = await prisma.service.update({
    where: { id },
    data: { isActive: false },
  });

  return deleted;
};

// ================================
// GET ALL CATEGORIES
// ================================
const getCategories = async () => {
  const categories = await prisma.service.findMany({
    where: { isActive: true },
    select: { category: true },
    distinct: ["category"],
  });

  return categories.map((item) => item.category);
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  getCategories,
};