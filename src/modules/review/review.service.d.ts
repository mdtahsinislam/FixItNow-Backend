import { ICreateReview } from "./review.interface";
export declare const ReviewService: {
    createReview: (customerId: string, payload: ICreateReview) => Promise<{
        id: string;
        createdAt: Date;
        customerId: string;
        technicianId: string;
        bookingId: string;
        rating: number;
        comment: string | null;
    }>;
    getTechnicianReviews: (technicianId: string, query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            averageRating: number;
        };
        data: ({
            booking: {
                service: {
                    title: string;
                };
            };
            customer: {
                id: string;
                name: string;
                profileImage: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            customerId: string;
            technicianId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        })[];
    }>;
    getMyReviews: (customerId: string) => Promise<({
        technician: {
            user: {
                id: string;
                name: string;
                profileImage: string | null;
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
        booking: {
            service: {
                title: string;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        customerId: string;
        technicianId: string;
        bookingId: string;
        rating: number;
        comment: string | null;
    })[]>;
};
//# sourceMappingURL=review.service.d.ts.map