import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import { BookingStatus } from "@prisma/client";
import { ICreateReview } from "./review.interface";
import { ReviewMessages } from "./review.constant";

// ================================
// CREATE REVIEW (Customer)
// ================================
const createReview = async (customerId: string, payload: ICreateReview) => {
  // 1. Find booking
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
    include: {
      review: true,
      technician: true,
    },
  });

  if (!booking) {
    throw new AppError(404, ReviewMessages.BOOKING_NOT_FOUND);
  }

  // 2. Only the customer who booked can review
  if (booking.customerId !== customerId) {
    throw new AppError(403, ReviewMessages.NOT_AUTHORIZED);
  }

  // 3. Booking must be COMPLETED
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new AppError(400, ReviewMessages.NOT_COMPLETED);
  }

  // 4. Already reviewed?
  if (booking.review) {
    throw new AppError(400, ReviewMessages.ALREADY_EXISTS);
  }

  // 5. Create review
  const review = await prisma.review.create({
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
const getTechnicianReviews = async (technicianId: string, query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
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
    prisma.review.count({ where: { technicianId } }),
  ]);

  // Calculate average rating
  const avgResult = await prisma.review.aggregate({
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
const getMyReviews = async (customerId: string) => {
  const reviews = await prisma.review.findMany({
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

export const ReviewService = {
  createReview,
  getTechnicianReviews,
  getMyReviews,
};