'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/products';
import { productService } from '@/services/productService';
import { Category } from '@/types/category';
import { categoryService } from '@/services/categoryService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import CategoryForm from './CategoryForm';


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
        alert('Produto criado com sucesso!');
        setForm({
            name: '',
            description: '',
            price: 0,
            stockQuantity: 0,
            categoryId: '',
        });
    }

    return (
        <div className="flex justify-center p-6">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Criar Produto</CardTitle>
                    <CardDescription>Preencha os campos abaixo para adicionar um novo produto ao catálogo.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Ex: Camiseta básica"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Input
                                id="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Ex: Camiseta 100% algodão"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Preço (R$)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: +e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">Quantidade em estoque</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={form.stockQuantity}
                                    onChange={(e) => setForm({ ...form, stockQuantity: +e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Categoria</Label>
                            <Select
                                onValueChange={(value) => setForm({ ...form, categoryId: value })}
                                value={form.categoryId}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <CategoryForm />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button type="submit">Criar Produto</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
