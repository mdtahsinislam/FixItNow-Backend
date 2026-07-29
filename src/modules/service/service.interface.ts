export interface ICreateService {
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

export interface IUpdateService {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string;
  isActive?: boolean;
}