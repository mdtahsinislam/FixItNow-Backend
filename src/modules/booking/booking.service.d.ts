import { ICreateBooking, IUpdateBookingStatus } from "./booking.interface";
export declare const BookingService: {
    createBooking: (customerId: string, payload: ICreateBooking) => Promise<{
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
    }>;
    getMyBookings: (userId: string, role: string, query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            technician: {
                user: {
                    id: string;
                    name: string;
                    phone: string | null;
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
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string;
                category: string;
                price: number;
                image: string | null;
            };
            customer: {
                id: string;
                email: string;
                name: string;
                phone: string | null;
            };
            payment: {
                id: string;
                createdAt: Date;
                status: import("@prisma/client").$Enums.PaymentStatus;
                bookingId: string;
                transactionId: string | null;
                amount: number;
                paymentMethod: string | null;
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
        })[];
    }>;
    getSingleBooking: (id: string, userId: string, role: string) => Promise<{
        technician: {
            user: {
                id: string;
                name: string;
                phone: string | null;
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
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            category: string;
            price: number;
            image: string | null;
        };
        review: {
            id: string;
            createdAt: Date;
            customerId: string;
            technicianId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        } | null;
        customer: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
        };
        payment: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            paymentMethod: string | null;
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
    }>;
    updateBookingStatus: (id: string, userId: string, role: string, payload: IUpdateBookingStatus) => Promise<{
        technician: {
            user: {
                id: string;
                name: string;
                phone: string | null;
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
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            category: string;
            price: number;
            image: string | null;
        };
        customer: {
            id: string;
            name: string;
            phone: string | null;
        };
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
    }>;
    getAllBookings: (query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
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
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string;
                category: string;
                price: number;
                image: string | null;
            };
            customer: {
                id: string;
                email: string;
                name: string;
            };
            payment: {
                id: string;
                createdAt: Date;
                status: import("@prisma/client").$Enums.PaymentStatus;
                bookingId: string;
                transactionId: string | null;
                amount: number;
                paymentMethod: string | null;
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
        })[];
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map