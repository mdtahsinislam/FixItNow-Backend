"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianService = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const technician_interface_1 = require("./technician.interface");
const technician_constant_1 = require("./technician.constant");
// ================================
// GET MY TECHNICIAN PROFILE
// ================================
const getMyProfile = async (userId) => {
    const technician = await prisma_1.prisma.technician.findUnique({
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
        throw new AppError_1.default(404, technician_constant_1.TechnicianMessages.PROFILE_NOT_FOUND);
    }
    return technician;
};
// ================================
// UPDATE MY PROFILE
// ================================
const updateMyProfile = async (userId, payload) => {
    const technician = await prisma_1.prisma.technician.findUnique({
        where: { userId },
    });
    if (!technician) {
        throw new AppError_1.default(404, technician_constant_1.TechnicianMessages.PROFILE_NOT_FOUND);
    }
    const updated = await prisma_1.prisma.technician.update({
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
const getAllTechnicians = async (query) => {
    const { status, availability, search, page = 1, limit = 10, } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    // Public users can only see APPROVED technicians
    if (status) {
        where.status = status;
    }
    else {
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
        prisma_1.prisma.technician.findMany({
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
        prisma_1.prisma.technician.count({ where }),
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
const getSingleTechnician = async (id) => {
    const technician = await prisma_1.prisma.technician.findUnique({
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
        throw new AppError_1.default(404, technician_constant_1.TechnicianMessages.PROFILE_NOT_FOUND);
    }
    return technician;
};
// ================================
// ADMIN → UPDATE TECHNICIAN STATUS
// ================================
const updateTechnicianStatus = async (id, payload) => {
    const technician = await prisma_1.prisma.technician.findUnique({
        where: { id },
    });
    if (!technician) {
        throw new AppError_1.default(404, technician_constant_1.TechnicianMessages.PROFILE_NOT_FOUND);
    }
    const updated = await prisma_1.prisma.technician.update({
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
    const technicians = await prisma_1.prisma.technician.findMany({
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
exports.TechnicianService = {
    getMyProfile,
    updateMyProfile,
    getAllTechnicians,
    getSingleTechnician,
    updateTechnicianStatus,
    getPendingTechnicians,
};
//# sourceMappingURL=technician.service.js.map