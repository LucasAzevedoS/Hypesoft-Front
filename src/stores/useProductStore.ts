import { create } from "zustand";
import { Product } from "../types/products";
import { productService } from "../services/productService";

type State = {
    products: Product[];
    loading: boolean;
    fetchAll: () => Promise<void>;
    create: (p: Product) => Promise<void>;
};

export const useProductStore = create<State>((set) => ({
    products: [],
    loading: false,

    fetchAll: async () => {
        set({ loading: true });
        const products = await productService.getAll();
        set({ products, loading: false });
    },

    // create: async (p: Product) => {
    //     set({ loading: true });
    //     await productService.create(p);
    //     await set((state) => ({ loading: false }));
    // }
}));
