import { Category } from "@/types/category";
import api from "./api";

export const categoryService = {
    getAll: async () => {
        const { data } = await api.get("/categories/categoryAll");
        return data;
    },

    create: async (payload: Category): Promise<string> => {
        const { data } = await api.post<string>("/Categories/category", payload);
        return data;
    },
};
