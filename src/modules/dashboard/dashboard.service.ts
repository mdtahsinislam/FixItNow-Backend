import { prisma } from "../../config/prisma";

const getAdminStats = async () => {
  const [
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalServices,
    totalBookings,
    pendingBookings,
    completedBookings,
    totalPayments,
    totalRevenue,
    pendingTechnicians,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "TECHNICIAN" } }),
    prisma.service.count({ where: { isActive: true } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.payment.count({ where: { status: "PAID" } }),
    prisma.payment.aggregate({
      where: { status: "PAID" },
      _sum: { amount: true },
    }),
    prisma.technician.count({ where: { status: "PENDING" } }),
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
  const bookings = await prisma.booking.findMany({
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
  const users = await prisma.user.findMany({
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

export const DashboardService = {
  getAdminStats,
  getRecentBookings,
  getRecentUsers,
};