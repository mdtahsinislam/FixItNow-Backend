"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = require("../../config/prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const client_1 = require("@prisma/client");
const review_interface_1 = require("./review.interface");
const review_constant_1 = require("./review.constant");
// ================================
// CREATE REVIEW (Customer)
// ================================
const createReview = async (customerId, payload) => {
    // 1. Find booking
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id: payload.bookingId },
        include: {
            review: true,
            technician: true,
        },
    });
    if (!booking) {
        throw new AppError_1.default(404, review_constant_1.ReviewMessages.BOOKING_NOT_FOUND);
    }
    // 2. Only the customer who booked can review
    if (booking.customerId !== customerId) {
        throw new AppError_1.default(403, review_constant_1.ReviewMessages.NOT_AUTHORIZED);
    }
    // 3. Booking must be COMPLETED
    if (booking.status !== client_1.BookingStatus.COMPLETED) {
        throw new AppError_1.default(400, review_constant_1.ReviewMessages.NOT_COMPLETED);
    }
    // 4. Already reviewed?
    if (booking.review) {
        throw new AppError_1.default(400, review_constant_1.ReviewMessages.ALREADY_EXISTS);
    }
    // 5. Create review
    const review = await prisma_1.prisma.review.create({
        data: {
            bookingId: payload.bookingId,
            customerId,
            technicianId: booking.technicianId,
            rating: payload.rating,
            comment: payload.comment,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
            booking: {
                select: {
                    id: true,
                    service: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
        },
    });
    return review;
};
// ================================
// GET REVIEWS OF A TECHNICIAN
// ================================
const getTechnicianReviews = async (technicianId, query) => {
    const { page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const [reviews, total] = await Promise.all([
        prisma_1.prisma.review.findMany({
            where: { technicianId },
            skip,
            take: Number(limit),
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
                booking: {
                    select: {
                        service: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.review.count({ where: { technicianId } }),
    ]);
    // Calculate average rating
    const avgResult = await prisma_1.prisma.review.aggregate({
        where: { technicianId },
        _avg: {
            rating: true,
        },
    });
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            averageRating: avgResult._avg.rating || 0,
        },
        data: reviews,
    };
};
// ================================
// GET MY REVIEWS (Customer)
// ================================
const getMyReviews = async (customerId) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: { customerId },
        include: {
            technician: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            profileImage: true,
                        },
                    },
                },
            },
            booking: {
                select: {
                    service: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return reviews;
};
exports.ReviewService = {
    createReview,
    getTechnicianReviews,
    getMyReviews,
};
//# sourceMappingURL=review.service.js.map