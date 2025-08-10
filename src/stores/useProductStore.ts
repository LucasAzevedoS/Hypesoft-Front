import { create } from "zustand";
import { Product, ProductStore } from "../types/products";
import { productService } from "../services/productService";

type State = {
    products: Product[];
    loading: boolean;
    fetchAll: () => Promise<void>;
    fetchAllDt: () => Promise<void>;
    create: (p: Product) => Promise<void>;
    update: (id: string, name: string, description: string, price: number, categoryId: string, quantity: number, dtCriacao: Date) => Promise<void>;
    remove: (id: string) => Promise<void>;
};

export const useProductStore = create<State>((set, get) => ({
    products: [],
    loading: false,

    fetchAll: async () => {
        set({ loading: true });
        try {
            const products = await productService.getAll();
            set({ products, loading: false });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            set({ loading: false });
            throw error;
        }
    },

    fetchAllDt: async () => {
        set({ loading: true });
        try {
            const products = await productService.getAllDt();
            const parsed = products.map(p => ({
                ...p,
                dtCriacao: p.dtCriacao ? new Date(p.dtCriacao) : null
            }));
            set({ products: parsed, loading: false });
        } catch (error) {
            console.error('Erro ao buscar produtos com data:', error);
            set({ loading: false });
            throw error;
        }
    },

    create: async (p: Product) => {
        set({ loading: true });
        try {
            await productService.create(p);
            set({ loading: false });
            await get().fetchAllDt();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            set({ loading: false });
            throw error;
        }
    },

    update: async (id, name, description, price, categoryId, quantity, dtCriacao) => {
        // Validar se o ID existe
        if (!id || id.trim() === '') {
            throw new Error('ID do produto é obrigatório para atualização');
        }

        set({ loading: true });
        try {
            console.log('Atualizando produto ID:', id); // Debug

            // CORREÇÃO: Montar o objeto Product COMPLETO
            const productPayload: Product = {
                id: id,  // ✅ Incluir o ID
                name,
                description,
                price,
                categoryId,
                stockQuantity: quantity,  // ✅ Nome correto da propriedade
                dtCriacao
            };

            console.log('Payload enviado:', productPayload); // Debug

            await productService.update(id, productPayload);
            set({ loading: false });
            await get().fetchAllDt();
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            console.error('ID usado:', id); // Debug
            set({ loading: false });
            throw error;
        }
    },

    remove: async (id: string) => {
        if (!id || id.trim() === '') {
            throw new Error('ID do produto é obrigatório para remoção');
        }

        set({ loading: true });
        try {
            await productService.remove(id);
            set(state => ({
                products: state.products.filter(p => p.id !== id),
                loading: false
            }));
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            set({ loading: false });
            throw error;
        }
    },
}));

export const useProductStorepaged = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,

    fetchPage: async (page) => {
        set({ loading: true });
        const res = await productService.getPaged(page, 12);

        const { page: currentPage, totalPages, hasNextPage, hasPreviousPage, ...rest } = res;

        const productsArray = res.data || res.products || [];

        set({
            products: productsArray,
            page: currentPage,
            totalPages,
            hasNextPage,
            hasPreviousPage,
            loading: false
        });
    }

}));

