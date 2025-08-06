'use client';

import React, { useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';

export default function ProductList() {
    const { products, fetchAll, loading } = useProductStore();

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    if (loading) return <div>Carregando...</div>;
    if (!products.length) return <div>Nenhum produto cadastrado</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(p => (
                <div key={p.id} className="border rounded p-4 shadow">
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-sm">{p.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <strong>R$ {p.price.toFixed(2)}</strong>
                        <span className="text-xs">Estoque: {p.stockQuantity}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
