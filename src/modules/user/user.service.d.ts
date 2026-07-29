import { IChangePassword, IUpdateProfile } from "./user.interface";
export declare const UserService: {
    getMyProfile: (userId: string) => Promise<{
        id: string;
        email: string;
        name: string;
        phone: string | null;
        address: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        profileImage: string | null;
        isActive: boolean;
        createdAt: Date;
        technician: {
            id: string;
            skills: string[];
            experience: number | null;
            hourlyRate: number | null;
            bio: string | null;
            status: import("@prisma/client").$Enums.TechnicianStatus;
            availability: boolean;
        } | null;
    }>;
    updateProfile: (userId: string, payload: IUpdateProfile) => Promise<{
        id: string;
        email: string;
        name: string;
        phone: string | null;
        address: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        profileImage: string | null;
        isActive: boolean;
        updatedAt: Date;
    }>;
    changePassword: (userId: string, payload: IChangePassword) => Promise<null>;
    getAllUsers: (query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
        }[];
    }>;
    updateUserStatus: (userId: string, isActive: boolean) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        isActive: boolean;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map