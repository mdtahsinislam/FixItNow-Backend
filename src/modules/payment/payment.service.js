"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
//D:\FixItNow-Backend\src\modules\payment\payment.service.ts
const prisma_1 = require("../../config/prisma");
const stripe_1 = require("../../config/stripe");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const client_1 = require("@prisma/client");
const payment_interface_1 = require("./payment.interface");
const payment_constant_1 = require("./payment.constant");
// ================================
// CREATE PAYMENT INTENT (Stripe)
// ================================
const createPaymentIntent = async (customerId, payload) => {
    // 1. Find booking
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id: payload.bookingId },
        include: {
            service: true,
            payment: true,
            customer: true,
        },
    });
    if (!booking) {
        throw new AppError_1.default(404, payment_constant_1.PaymentMessages.BOOKING_NOT_FOUND);
    }
    // 2. Only the booking owner can pay
    if (booking.customerId !== customerId) {
        throw new AppError_1.default(403, payment_constant_1.PaymentMessages.NOT_AUTHORIZED);
    }
    // 3. Only ACCEPTED bookings can be paid
    if (booking.status !== client_1.BookingStatus.ACCEPTED) {
        throw new AppError_1.default(400, payment_constant_1.PaymentMessages.INVALID_BOOKING_STATUS);
    }
    // 4. Already paid?
    if (booking.payment && booking.payment.status === client_1.PaymentStatus.PAID) {
        throw new AppError_1.default(400, payment_constant_1.PaymentMessages.ALREADY_PAID);
    }
    const amount = booking.service.price;
    // 5. Create Stripe PaymentIntent
    const paymentIntent = await stripe_1.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe uses cents
        currency: "usd",
        metadata: {
            bookingId: booking.id,
            customerId: customerId,
            serviceTitle: booking.service.title,
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });
    // 6. Create or Update Payment record
    let payment;
    if (booking.payment) {
        payment = await prisma_1.prisma.payment.update({
            where: { bookingId: booking.id },
            data: {
                transactionId: paymentIntent.id,
                amount,
                status: client_1.PaymentStatus.PENDING,
                paymentMethod: "stripe",
            },
        });
    }
    else {
        payment = await prisma_1.prisma.payment.create({
            data: {
                bookingId: booking.id,
                transactionId: paymentIntent.id,
                amount,
                status: client_1.PaymentStatus.PENDING,
                paymentMethod: "stripe",
            },
        });
    }
    return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        paymentId: payment.id,
        amount,
        currency: "usd",
    };
};
// ================================
// CONFIRM PAYMENT (after frontend success)
// ================================
// const confirmPayment = async (paymentIntentId: string) => {
//   // Retrieve from Stripe
//   const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//   if (paymentIntent.status !== "succeeded") {
//     throw new AppError(400, "Payment not completed yet");
//   }
//   const bookingId = paymentIntent.metadata.bookingId;
//   // Update payment status
//   const payment = await prisma.payment.update({
//     where: { bookingId },
//     data: {
//       status: PaymentStatus.PAID,
//       transactionId: paymentIntentId,
//     },
//     include: {
//       booking: {
//         include: {
//           service: true,
//           customer: {
//             select: { id: true, name: true, email: true },
//           },
//         },
//       },
//     },
//   });
//   return payment;
// };
// ================================
// CONFIRM PAYMENT
// ================================
const confirmPayment = async (paymentIntentId) => {
    // Stripe থেকে PaymentIntent নিয়ে আসি
    const paymentIntent = await stripe_1.stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
        throw new AppError_1.default(404, "PaymentIntent not found");
    }
    // Booking ID বের করি
    const bookingId = paymentIntent.metadata.bookingId;
    if (!bookingId) {
        throw new AppError_1.default(400, "Booking ID not found in payment metadata");
    }
    // Payment রেকর্ড আপডেট করি → PAID করে দিই (Testing এর জন্য)
    const payment = await prisma_1.prisma.payment.update({
        where: { bookingId },
        data: {
            status: "PAID",
            transactionId: paymentIntentId,
            paymentMethod: "stripe",
        },
        include: {
            booking: {
                include: {
                    service: true,
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
    return payment;
};
// ================================
// GET MY PAYMENTS
// ================================
const getMyPayments = async (userId, query) => {
    const { page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const [payments, total] = await Promise.all([
        prisma_1.prisma.payment.findMany({
            where: {
                booking: {
                    customerId: userId,
                },
            },
            skip,
            take: Number(limit),
            include: {
                booking: {
                    include: {
                        service: true,
                        technician: {
                            include: {
                                user: {
                                    select: { id: true, name: true },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.payment.count({
            where: {
                booking: {
                    customerId: userId,
                },
            },
        }),
    ]);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: payments,
    };
};
// ================================
// GET SINGLE PAYMENT
// ================================
const getSinglePayment = async (id, userId) => {
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { id },
        include: {
            booking: {
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
                },
            },
        },
    });
    if (!payment) {
        throw new AppError_1.default(404, payment_constant_1.PaymentMessages.NOT_FOUND);
    }
    if (payment.booking.customerId !== userId) {
        throw new AppError_1.default(403, payment_constant_1.PaymentMessages.NOT_AUTHORIZED);
    }
    return payment;
};
exports.PaymentService = {
    createPaymentIntent,
    confirmPayment,
    getMyPayments,
    getSinglePayment,
};
//# sourceMappingURL=payment.service.js.map