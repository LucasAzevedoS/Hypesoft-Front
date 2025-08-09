'use client';

import React, { useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';

export default function ProductListDt() {
    const { products, fetchAllDt, loading } = useProductStore();

    useEffect(() => {
        fetchAllDt();
    }, [fetchAllDt]);

    if (loading) return <div>Carregando...</div>;
    if (!products.length) return <div>Nenhum produto cadastrado</div>;

    return (
        <div className="grid grid-cols-12 md:grid-cols-1 gap-4 mt-6">
            {products.map(p => (
                <div key={p.id} className="border rounded p-4 shadow">
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-sm">{p.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <strong>R$ {p.price.toFixed(2)}</strong>
                        <span className="text-xs">Estoque: {p.stockQuantity}</span>
                        <span className="text-xs">Criado em: {p.DtCriacao?.toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
