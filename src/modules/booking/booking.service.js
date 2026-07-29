"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const client_1 = require("@prisma/client");
const booking_interface_1 = require("./booking.interface");
const booking_constant_1 = require("./booking.constant");
// ================================
// CREATE BOOKING (Customer)
// ================================
const createBooking = async (customerId, payload) => {
    // 1. Check technician exists & approved
    const technician = await prisma_1.prisma.technician.findUnique({
        where: { id: payload.technicianId },
        include: { user: true },
    });
    if (!technician) {
        throw new AppError_1.default(404, "Technician not found");
    }
    if (technician.status !== "APPROVED") {
        throw new AppError_1.default(400, booking_constant_1.BookingMessages.TECHNICIAN_NOT_APPROVED);
    }
    if (!technician.availability) {
        throw new AppError_1.default(400, booking_constant_1.BookingMessages.TECHNICIAN_NOT_AVAILABLE);
    }
    // 2. Check service exists
    const service = await prisma_1.prisma.service.findUnique({
        where: { id: payload.serviceId },
    });
    if (!service || !service.isActive) {
        throw new AppError_1.default(404, booking_constant_1.BookingMessages.SERVICE_NOT_FOUND);
    }
    // 3. Create booking
    const booking = await prisma_1.prisma.booking.create({
        data: {
            customerId,
            technicianId: payload.technicianId,
            serviceId: payload.serviceId,
            bookingDate: new Date(payload.bookingDate),
            address: payload.address,
            note: payload.note,
            status: client_1.BookingStatus.PENDING,
        },
        include: {
            service: true,
            technician: {
                include: {
                    user: {
                        select: { id: true, name: true, phone: true },
                    },
                },
            },
            customer: {
                select: { id: true, name: true, phone: true },
            },
        },
    });
    return booking;
};
// ================================
// GET MY BOOKINGS (Customer / Technician)
// ================================
const getMyBookings = async (userId, role, query) => {
    const { status, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (role === "CUSTOMER") {
        where.customerId = userId;
    }
    else if (role === "TECHNICIAN") {
        const technician = await prisma_1.prisma.technician.findUnique({
            where: { userId },
        });
        if (!technician) {
            throw new AppError_1.default(404, "Technician profile not found");
        }
        where.technicianId = technician.id;
    }
    if (status) {
        where.status = status;
    }
    const [bookings, total] = await Promise.all([
        prisma_1.prisma.booking.findMany({
            where,
            skip,
            take: Number(limit),
            include: {
                service: true,
                customer: {
                    select: { id: true, name: true, phone: true, email: true },
                },
                technician: {
                    include: {
                        user: {
                            select: { id: true, name: true, phone: true },
                        },
                    },
                },
                payment: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.booking.count({ where }),
    ]);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: bookings,
    };
};
// ================================
// GET SINGLE BOOKING
// ================================
// const getSingleBooking = async (id: string, userId: string, role: string) => {
//   const booking = await prisma.booking.findUnique({
//     where: { id },
//     include: {
//       service: true,
//       customer: {
//         select: { id: true, name: true, phone: true, email: true },
//       },
//       technician: {
//         include: {
//           user: {
//             select: { id: true, name: true, phone: true },
//           },
//         },
//       },
//       payment: true,
//       review: true,
//     },
//   });
//   if (!booking) {
//     throw new AppError(404, BookingMessages.NOT_FOUND);
//   }
//   // Authorization check
//   if (role === "CUSTOMER" && booking.customerId !== userId) {
//     throw new AppError(403, BookingMessages.NOT_AUTHORIZED);
//   }
//   if (role === "TECHNICIAN") {
//     const technician = await prisma.technician.findUnique({
//       where: { userId },
//     });
//     if (!technician || booking.technicianId !== technician.id) {
//       throw new AppError(403, BookingMessages.NOT_AUTHORIZED);
//     }
//   }
//   return booking;
// };
// ================================
// GET SINGLE BOOKING
// ================================
const getSingleBooking = async (id, userId, role) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id },
        include: {
            service: true,
            customer: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    email: true,
                },
            },
            technician: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                        },
                    },
                },
            },
            payment: true,
            review: true,
        },
    });
    if (!booking) {
        throw new AppError_1.default(404, "Booking not found");
    }
    // Authorization check
    if (role === "CUSTOMER" && booking.customerId !== userId) {
        throw new AppError_1.default(403, "You are not authorized to view this booking");
    }
    if (role === "TECHNICIAN") {
        const technician = await prisma_1.prisma.technician.findUnique({
            where: { userId },
        });
        if (!technician || booking.technicianId !== technician.id) {
            throw new AppError_1.default(403, "You are not authorized to view this booking");
        }
    }
    return booking;
};
// ================================
// UPDATE BOOKING STATUS
// ================================
const updateBookingStatus = async (id, userId, role, payload) => {
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id },
    });
    if (!booking) {
        throw new AppError_1.default(404, booking_constant_1.BookingMessages.NOT_FOUND);
    }
    // ========== Customer can only CANCEL ==========
    if (role === "CUSTOMER") {
        if (booking.customerId !== userId) {
            throw new AppError_1.default(403, booking_constant_1.BookingMessages.NOT_AUTHORIZED);
        }
        if (payload.status !== "CANCELLED") {
            throw new AppError_1.default(400, "Customers can only cancel bookings");
        }
        if (["ONGOING", "COMPLETED"].includes(booking.status)) {
            throw new AppError_1.default(400, booking_constant_1.BookingMessages.CANNOT_CANCEL);
        }
    }
    // ========== Technician actions ==========
    if (role === "TECHNICIAN") {
        const technician = await prisma_1.prisma.technician.findUnique({
            where: { userId },
        });
        if (!technician || booking.technicianId !== technician.id) {
            throw new AppError_1.default(403, booking_constant_1.BookingMessages.NOT_AUTHORIZED);
        }
        // Valid transitions for technician
        const allowed = {
            PENDING: ["ACCEPTED", "REJECTED"],
            ACCEPTED: ["ONGOING"],
            ONGOING: ["COMPLETED"],
        };
        if (!allowed[booking.status]?.includes(payload.status)) {
            throw new AppError_1.default(400, `Cannot change status from ${booking.status} to ${payload.status}`);
        }
    }
    const updated = await prisma_1.prisma.booking.update({
        where: { id },
        data: { status: payload.status },
        include: {
            service: true,
            customer: {
                select: { id: true, name: true, phone: true },
            },
            technician: {
                include: {
                    user: {
                        select: { id: true, name: true, phone: true },
                    },
                },
            },
        },
    });
    return updated;
};
// ================================
// ADMIN → GET ALL BOOKINGS
// ================================
const getAllBookings = async (query) => {
    const { status, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (status)
        where.status = status;
    const [bookings, total] = await Promise.all([
        prisma_1.prisma.booking.findMany({
            where,
            skip,
            take: Number(limit),
            include: {
                service: true,
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
                payment: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.booking.count({ where }),
    ]);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: bookings,
    };
};
exports.BookingService = {
    createBooking,
    getMyBookings,
    getSingleBooking,
    updateBookingStatus,
    getAllBookings,
};
//# sourceMappingURL=booking.service.js.map