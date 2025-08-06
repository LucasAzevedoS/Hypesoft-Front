import api from "./api";
import { Product } from "../types/products";

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const { data } = await api.get<Product[]>("/Products/FindAll");
        return data;
    },

    getById: async (id: string): Promise<Product> => {
        const { data } = await api.get<Product>(`/Products/FindById/${id}`);
        return data;
    },

    // create: async (payload: Product): Promise<string> => {
    //     const { data } = await api.post<string>("/products", payload);
    //     return data;
    // },

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

    // getByCategory: async (categoryId: string): Promise<Product[]> => {
    //     const { data } = await api.get<Product[]>(`/products/categoria/${categoryId}`);
    //     return data;
    // }
};
