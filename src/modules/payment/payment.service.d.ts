import { ICreatePayment } from "./payment.interface";
export declare const PaymentService: {
    createPaymentIntent: (customerId: string, payload: ICreatePayment) => Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
        paymentId: string;
        amount: number;
        currency: string;
    }>;
    confirmPayment: (paymentIntentId: string) => Promise<{
        booking: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        amount: number;
        paymentMethod: string | null;
    }>;
    getMyPayments: (userId: string, query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            booking: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            paymentMethod: string | null;
        })[];
    }>;
    getSinglePayment: (id: string, userId: string) => Promise<{
        booking: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        amount: number;
        paymentMethod: string | null;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map