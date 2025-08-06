import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

export const useProducts = () => {
    const { products, fetchAll, loading } = useProductStore();

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { products, loading };
};
