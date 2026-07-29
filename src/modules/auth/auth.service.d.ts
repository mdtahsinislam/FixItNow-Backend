import { ILoginUser, IRegisterUser } from "./auth.interface";
export declare const AuthService: {
    registerUser: (payload: IRegisterUser) => Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        phone: string | null;
        address: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        profileImage: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    loginUser: (payload: ILoginUser) => Promise<{
        accessToken: never;
        refreshToken: never;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            phone: string | null;
            address: string | null;
        };
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: never;
    }>;
    getMe: (userId: string) => Promise<{
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
    logout: () => Promise<null>;
};
//# sourceMappingURL=auth.service.d.ts.map