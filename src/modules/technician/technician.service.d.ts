import { IUpdateTechnicianProfile, IUpdateTechnicianStatus } from "./technician.interface";
export declare const TechnicianService: {
    getMyProfile: (userId: string) => Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            address: string | null;
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
    }>;
    updateMyProfile: (userId: string, payload: IUpdateTechnicianProfile) => Promise<{
        user: {
            id: string;
            email: string;
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
    }>;
    getAllTechnicians: (query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: ({
            user: {
                id: string;
                email: string;
                name: string;
                phone: string | null;
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
        })[];
    }>;
    getSingleTechnician: (id: string) => Promise<{
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            comment: string | null;
            customer: {
                id: string;
                name: string;
                profileImage: string | null;
            };
        }[];
        user: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            address: string | null;
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
    }>;
    updateTechnicianStatus: (id: string, payload: IUpdateTechnicianStatus) => Promise<{
        user: {
            id: string;
            email: string;
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
    }>;
    getPendingTechnicians: () => Promise<({
        user: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            createdAt: Date;
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
    })[]>;
};
//# sourceMappingURL=technician.service.d.ts.map