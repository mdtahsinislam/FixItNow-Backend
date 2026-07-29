

//D:\FixItNow-Backend\src\modules\payment\payment.service.ts
import { prisma } from "../../config/prisma";
import { stripe } from "../../config/stripe";
import AppError from "../../utils/AppError";
import { PaymentStatus, BookingStatus } from "@prisma/client";
import { ICreatePayment } from "./payment.interface";
import { PaymentMessages } from "./payment.constant";

// ================================
// CREATE PAYMENT INTENT (Stripe)
// ================================
const createPaymentIntent = async (customerId: string, payload: ICreatePayment) => {
  // 1. Find booking
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
    include: {
      service: true,
      payment: true,
      customer: true,
    },
  });

  if (!booking) {
    throw new AppError(404, PaymentMessages.BOOKING_NOT_FOUND);
  }

  // 2. Only the booking owner can pay
  if (booking.customerId !== customerId) {
    throw new AppError(403, PaymentMessages.NOT_AUTHORIZED);
  }

  // 3. Only ACCEPTED bookings can be paid
  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new AppError(400, PaymentMessages.INVALID_BOOKING_STATUS);
  }

  // 4. Already paid?
  if (booking.payment && booking.payment.status === PaymentStatus.PAID) {
    throw new AppError(400, PaymentMessages.ALREADY_PAID);
  }

  const amount = booking.service.price;

  // 5. Create Stripe PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
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
    payment = await prisma.payment.update({
      where: { bookingId: booking.id },
      data: {
        transactionId: paymentIntent.id,
        amount,
        status: PaymentStatus.PENDING,
        paymentMethod: "stripe",
      },
    });
  } else {
    payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        transactionId: paymentIntent.id,
        amount,
        status: PaymentStatus.PENDING,
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
const confirmPayment = async (paymentIntentId: string) => {
  // Stripe থেকে PaymentIntent নিয়ে আসি
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (!paymentIntent) {
    throw new AppError(404, "PaymentIntent not found");
  }

  // Booking ID বের করি
  const bookingId = paymentIntent.metadata.bookingId;

  if (!bookingId) {
    throw new AppError(400, "Booking ID not found in payment metadata");
  }

  // Payment রেকর্ড আপডেট করি → PAID করে দিই (Testing এর জন্য)
  const payment = await prisma.payment.update({
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
const getMyPayments = async (userId: string, query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
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
    prisma.payment.count({
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
const getSinglePayment = async (id: string, userId: string) => {
  const payment = await prisma.payment.findUnique({
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
    throw new AppError(404, PaymentMessages.NOT_FOUND);
  }

  if (payment.booking.customerId !== userId) {
    throw new AppError(403, PaymentMessages.NOT_AUTHORIZED);
  }

  return payment;
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};