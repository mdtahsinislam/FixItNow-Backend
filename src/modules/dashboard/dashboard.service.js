"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = require("../../config/prisma");
const getAdminStats = async () => {
    const [totalUsers, totalCustomers, totalTechnicians, totalServices, totalBookings, pendingBookings, completedBookings, totalPayments, totalRevenue, pendingTechnicians,] = await Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.user.count({ where: { role: "CUSTOMER" } }),
        prisma_1.prisma.user.count({ where: { role: "TECHNICIAN" } }),
        prisma_1.prisma.service.count({ where: { isActive: true } }),
        prisma_1.prisma.booking.count(),
        prisma_1.prisma.booking.count({ where: { status: "PENDING" } }),
        prisma_1.prisma.booking.count({ where: { status: "COMPLETED" } }),
        prisma_1.prisma.payment.count({ where: { status: "PAID" } }),
        prisma_1.prisma.payment.aggregate({
            where: { status: "PAID" },
            _sum: { amount: true },
        }),
        prisma_1.prisma.technician.count({ where: { status: "PENDING" } }),
    ]);
    return {
        totalUsers,
        totalCustomers,
        totalTechnicians,
        totalServices,
        totalBookings,
        pendingBookings,
        completedBookings,
        totalPayments,
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingTechnicians,
    };
};
const getRecentBookings = async () => {
    const bookings = await prisma_1.prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
            customer: {
                select: { id: true, name: true, email: true },
            },
            technician: {
                include: {
                    user: {
                        select: { id: true, name: true },
                    },
                },
            },
            service: {
                select: { title: true, price: true },
            },
            payment: {
                select: { status: true, amount: true },
            },
        },
    });
    return bookings;
};
const getRecentUsers = async () => {
    const users = await prisma_1.prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
        },
    });
    return users;
};
exports.DashboardService = {
    getAdminStats,
    getRecentBookings,
    getRecentUsers,
};
//# sourceMappingURL=dashboard.service.js.map