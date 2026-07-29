import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import { BookingStatus } from "@prisma/client";
import { ICreateBooking, IUpdateBookingStatus } from "./booking.interface";
import { BookingMessages } from "./booking.constant";

// ================================
// CREATE BOOKING (Customer)
// ================================
const createBooking = async (customerId: string, payload: ICreateBooking) => {
  // 1. Check technician exists & approved
  const technician = await prisma.technician.findUnique({
    where: { id: payload.technicianId },
    include: { user: true },
  });

  if (!technician) {
    throw new AppError(404, "Technician not found");
  }

  if (technician.status !== "APPROVED") {
    throw new AppError(400, BookingMessages.TECHNICIAN_NOT_APPROVED);
  }

  if (!technician.availability) {
    throw new AppError(400, BookingMessages.TECHNICIAN_NOT_AVAILABLE);
  }

  // 2. Check service exists
  const service = await prisma.service.findUnique({
    where: { id: payload.serviceId },
  });

  if (!service || !service.isActive) {
    throw new AppError(404, BookingMessages.SERVICE_NOT_FOUND);
  }

  // 3. Create booking
  const booking = await prisma.booking.create({
    data: {
      customerId,
      technicianId: payload.technicianId,
      serviceId: payload.serviceId,
      bookingDate: new Date(payload.bookingDate),
      address: payload.address,
      note: payload.note,
      status: BookingStatus.PENDING,
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
const getMyBookings = async (userId: string, role: string, query: any) => {
  const { status, page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (role === "CUSTOMER") {
    where.customerId = userId;
  } else if (role === "TECHNICIAN") {
    const technician = await prisma.technician.findUnique({
      where: { userId },
    });
    if (!technician) {
      throw new AppError(404, "Technician profile not found");
    }
    where.technicianId = technician.id;
  }

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
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
    prisma.booking.count({ where }),
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
const getSingleBooking = async (id: string, userId: string, role: string) => {
  const booking = await prisma.booking.findUnique({
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
    throw new AppError(404, "Booking not found");
  }

  // Authorization check
  if (role === "CUSTOMER" && booking.customerId !== userId) {
    throw new AppError(403, "You are not authorized to view this booking");
  }

  if (role === "TECHNICIAN") {
    const technician = await prisma.technician.findUnique({
      where: { userId },
    });

    if (!technician || booking.technicianId !== technician.id) {
      throw new AppError(403, "You are not authorized to view this booking");
    }
  }

  return booking;
};
// ================================
// UPDATE BOOKING STATUS
// ================================
const updateBookingStatus = async (
  id: string,
  userId: string,
  role: string,
  payload: IUpdateBookingStatus
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new AppError(404, BookingMessages.NOT_FOUND);
  }

  // ========== Customer can only CANCEL ==========
  if (role === "CUSTOMER") {
    if (booking.customerId !== userId) {
      throw new AppError(403, BookingMessages.NOT_AUTHORIZED);
    }

    if (payload.status !== "CANCELLED") {
      throw new AppError(400, "Customers can only cancel bookings");
    }

    if (["ONGOING", "COMPLETED"].includes(booking.status)) {
      throw new AppError(400, BookingMessages.CANNOT_CANCEL);
    }
  }

  // ========== Technician actions ==========
  if (role === "TECHNICIAN") {
    const technician = await prisma.technician.findUnique({
      where: { userId },
    });

    if (!technician || booking.technicianId !== technician.id) {
      throw new AppError(403, BookingMessages.NOT_AUTHORIZED);
    }

    // Valid transitions for technician
    const allowed: Record<string, string[]> = {
      PENDING: ["ACCEPTED", "REJECTED"],
      ACCEPTED: ["ONGOING"],
      ONGOING: ["COMPLETED"],
    };

    if (!allowed[booking.status]?.includes(payload.status)) {
      throw new AppError(
        400,
        `Cannot change status from ${booking.status} to ${payload.status}`
      );
    }
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: payload.status as BookingStatus },
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
const getAllBookings = async (query: any) => {
  const { status, page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  if (status) where.status = status;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
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
    prisma.booking.count({ where }),
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

export const BookingService = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  updateBookingStatus,
  getAllBookings,
};