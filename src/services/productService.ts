import api from "./api";
import { Product } from "../types/products";

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const { data } = await api.get<Product[]>("/Products/GetAll");
        return data;
    },

    getPaged: async (page: number, pageSize: number) => {
        const res = await api.get(`/products/paged?page=${page}&pageSize=${pageSize}`);
        return res.data;
    },

    getAllDt: async (): Promise<Product[]> => {
        const { data } = await api.get<Product[]>("/Products/GetLast");
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

    getLowStock: async (): Promise<Product[]> => {
        const { data } = await api.get<Product[]>("/Product/LowStock");
        return data;
    },

    remove: async (id: string): Promise<void> => {
        await api.delete(`/Products/DeleteById/${id}`);
    },

    update: async (id: string, payload: Product): Promise<void> => {
        await api.put(`/Products/EditById/${id}`, payload);
    },


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
