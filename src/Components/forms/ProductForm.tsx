'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/products';
import { productService } from '@/services/productService';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function ProductForm() {
    const [form, setForm] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        categoryId: ''
    });

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        categoryService.getAll().then(setCategories);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await productService.create(form);
        alert('Produto criado');
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nome" />
                    <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Descrição" />
                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} placeholder="Preço" />
                    <input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: +e.target.value })} placeholder="Quantidade" />
                    <label htmlFor="">category</label>
                    {/* <input value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} placeholder="Categoria ID" /> */}
                    <Select
                        onValueChange={(value) => setForm({ ...form, categoryId: value })}
                        value={form.categoryId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <button type="submit" className="btn">Criar</button>
                </form>
            </div></>

    );
}
