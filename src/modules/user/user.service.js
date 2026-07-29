"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const bcrypt_1 = require("../../utils/bcrypt");
const user_interface_1 = require("./user.interface");
const user_constant_1 = require("./user.constant");
// ================================
// GET MY PROFILE
// ================================
const getMyProfile = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
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
        throw new AppError_1.default(404, user_constant_1.UserMessages.USER_NOT_FOUND);
    }
    return user;
};
// ================================
// UPDATE PROFILE
// ================================
const updateProfile = async (userId, payload) => {
    const user = await prisma_1.prisma.user.update({
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
const changePassword = async (userId, payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError_1.default(404, user_constant_1.UserMessages.USER_NOT_FOUND);
    }
    const isMatch = await (0, bcrypt_1.comparePassword)(payload.oldPassword, user.password);
    if (!isMatch) {
        throw new AppError_1.default(400, user_constant_1.UserMessages.INCORRECT_PASSWORD);
    }
    const hashed = await (0, bcrypt_1.hashPassword)(payload.newPassword);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
    });
    return null;
};
// ================================
// ADMIN → GET ALL USERS
// ================================
const getAllUsers = async (query) => {
    const { role, search, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (role)
        where.role = role;
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
        ];
    }
    const [users, total] = await Promise.all([
        prisma_1.prisma.user.findMany({
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
        prisma_1.prisma.user.count({ where }),
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
const updateUserStatus = async (userId, isActive) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError_1.default(404, user_constant_1.UserMessages.USER_NOT_FOUND);
    }
    const updated = await prisma_1.prisma.user.update({
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
exports.UserService = {
    getMyProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    updateUserStatus,
};
//# sourceMappingURL=user.service.js.map