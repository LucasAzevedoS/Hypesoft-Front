import api from "./api";
import { Product } from "../types/products";

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const { data } = await api.get<Product[]>("/Products/GetAll");
        return data;
    },

    getById: async (id: string): Promise<Product> => {
        const { data } = await api.get<Product>(`/Products/GetById/${id}`);
        return data;
    },

    create: async (payload: Product): Promise<string> => {
        const { data } = await api.post<string>("/Products/Create", payload);
        return data;
    },

    // updateStock: async (productId: string, newQuantity: number) => {
    //     await api.patch("/products/estoque", {
    //         productId,
    //         newQuantity,
    //     });
    // },

    // searchByName: async (name: string): Promise<Product[]> => {
    //     const { data } = await api.get<Product[]>("/products/search", {
    //         params: { name }
    //     });
    //     return data;
    // },

    getByCategory: async (categoryId: string): Promise<Product[]> => {
        const { data } = await api.get<Product[]>(`/Product/por-categoria/${categoryId}`);
        return data;
    }
};
