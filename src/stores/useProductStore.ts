import { create } from "zustand";
import { Product } from "../types/products";
import { productService } from "../services/productService";

type State = {
    products: Product[];
    loading: boolean;
    fetchAll: () => Promise<void>;
    fetchAllDt: () => Promise<void>;
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

    fetchAllDt: async () => {
        set({ loading: true });
        const products = await productService.getAllDt();
        const parsed = products.map(p => ({
            ...p,
            DtCriacao: p.DtCriacao ? new Date(p.DtCriacao) : null
        }));
        set({ products: parsed, loading: false });
    },


    create: async (p: Product) => {
        set({ loading: true });
        await productService.create(p);
        await set((state) => ({ loading: false }));
    }
}));