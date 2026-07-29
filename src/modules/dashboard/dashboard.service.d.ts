export declare const DashboardService: {
    getAdminStats: () => Promise<{
        totalUsers: number;
        totalCustomers: number;
        totalTechnicians: number;
        totalServices: number;
        totalBookings: number;
        pendingBookings: number;
        completedBookings: number;
        totalPayments: number;
        totalRevenue: number;
        pendingTechnicians: number;
    }>;
    getRecentBookings: () => Promise<({
        technician: {
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            skills: string[];
            experience: number | null;
            hourlyRate: number | null;
            bio: string | null;
            status: import("@prisma/client").$Enums.TechnicianStatus;
            availability: boolean;
        };
        service: {
            title: string;
            price: number;
        };
        customer: {
            id: string;
            email: string;
            name: string;
        };
        payment: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            amount: number;
        } | null;
    } & {
        id: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        customerId: string;
        technicianId: string;
        serviceId: string;
        bookingDate: Date;
        note: string | null;
    })[]>;
    getRecentUsers: () => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
    }[]>;
};
//# sourceMappingURL=dashboard.service.d.ts.map