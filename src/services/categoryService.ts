import api from "./api";

export const categoryService = {
    getAll: async () => {
        const { data } = await api.get("/categories/FindAll");
        return data;
    }
};
