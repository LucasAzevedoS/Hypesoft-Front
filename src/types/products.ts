export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    categoryId?: string;
    stockQuantity: number;
    dtCriacao?: Date | null;
}

export interface ProductPagedResponse {
    items: Product[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ProductStore {
    products: Product[];
    loading: boolean;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    fetchPage: (page: number) => Promise<void>;
}
