export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: "CUSTOMER" | "TECHNICIAN";
}
export interface ILoginUser {
    email: string;
    password: string;
}
export interface IJwtPayload {
    userId: string;
    email: string;
    role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
}
//# sourceMappingURL=auth.interface.d.ts.map