'use client';

import React, { useState } from 'react';
import { Product } from '@/types/products';
import { productService } from '@/services/productService';

export default function ProductForm() {
    const [form, setForm] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        categoryId: ''
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await productService.create(form);
        alert('Produto criado');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nome" />
            <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Descrição" />
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} placeholder="Preço" />
            <input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: +e.target.value })} placeholder="Quantidade" />
            <label htmlFor="">category</label>
            <input type="number" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} placeholder="Categoria ID" />
            <button type="submit" className="btn">Criar</button>
        </form>
    );
}
