import { ICreateService, IUpdateService } from "./service.interface";
export declare const ServiceService: {
    createService: (payload: ICreateService) => Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        price: number;
        image: string | null;
    }>;
    getAllServices: (query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            category: string;
            price: number;
            image: string | null;
        }[];
    }>;
    getSingleService: (id: string) => Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        price: number;
        image: string | null;
    }>;
    updateService: (id: string, payload: IUpdateService) => Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        price: number;
        image: string | null;
    }>;
    deleteService: (id: string) => Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        price: number;
        image: string | null;
    }>;
    getCategories: () => Promise<string[]>;
};
//# sourceMappingURL=service.service.d.ts.map