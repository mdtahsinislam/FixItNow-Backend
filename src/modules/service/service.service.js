"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const service_interface_1 = require("./service.interface");
const service_constant_1 = require("./service.constant");
// ================================
// CREATE SERVICE (Admin)
// ================================
const createService = async (payload) => {
    const existing = await prisma_1.prisma.service.findFirst({
        where: {
            title: {
                equals: payload.title,
                mode: "insensitive",
            },
        },
    });
    if (existing) {
        throw new AppError_1.default(409, service_constant_1.ServiceMessages.ALREADY_EXISTS);
    }
    const service = await prisma_1.prisma.service.create({
        data: payload,
    });
    return service;
};
// ================================
// GET ALL SERVICES (Public + Filter)
// ================================
const getAllServices = async (query) => {
    const { category, search, minPrice, maxPrice, isActive, page = 1, limit = 10, } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    // Public by default only active services
    if (isActive !== undefined) {
        where.isActive = isActive === "true" || isActive === true;
    }
    else {
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
        if (minPrice)
            where.price.gte = Number(minPrice);
        if (maxPrice)
            where.price.lte = Number(maxPrice);
    }
    const [services, total] = await Promise.all([
        prisma_1.prisma.service.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.service.count({ where }),
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
const getSingleService = async (id) => {
    const service = await prisma_1.prisma.service.findUnique({
        where: { id },
    });
    if (!service) {
        throw new AppError_1.default(404, service_constant_1.ServiceMessages.NOT_FOUND);
    }
    return service;
};
// ================================
// UPDATE SERVICE (Admin)
// ================================
const updateService = async (id, payload) => {
    const service = await prisma_1.prisma.service.findUnique({ where: { id } });
    if (!service) {
        throw new AppError_1.default(404, service_constant_1.ServiceMessages.NOT_FOUND);
    }
    const updated = await prisma_1.prisma.service.update({
        where: { id },
        data: payload,
    });
    return updated;
};
// ================================
// DELETE SERVICE (Admin) - Soft delete
// ================================
const deleteService = async (id) => {
    const service = await prisma_1.prisma.service.findUnique({ where: { id } });
    if (!service) {
        throw new AppError_1.default(404, service_constant_1.ServiceMessages.NOT_FOUND);
    }
    // Soft delete
    const deleted = await prisma_1.prisma.service.update({
        where: { id },
        data: { isActive: false },
    });
    return deleted;
};
// ================================
// GET ALL CATEGORIES
// ================================
const getCategories = async () => {
    const categories = await prisma_1.prisma.service.findMany({
        where: { isActive: true },
        select: { category: true },
        distinct: ["category"],
    });
    return categories.map((item) => item.category);
};
exports.ServiceService = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
    getCategories,
};
//# sourceMappingURL=service.service.js.map