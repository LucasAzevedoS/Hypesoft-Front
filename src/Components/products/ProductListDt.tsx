'use client';

import React, { useEffect, useState } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { DialogHeader } from '../ui/dialog';


export default function ProductListDt() {
    const { products, fetchAllDt, loading, remove, update } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        fetchAllDt();
    }, [fetchAllDt]);

    if (loading) return <div className="text-center py-8">Carregando...</div>;
    if (!products.length) return <div className="text-center py-8 text-gray-500">Nenhum produto cadastrado</div>;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 px-4 md:px-0">Atividade Recente</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
                    >
                        {/* Botão de opções */}
                        <div className="absolute top-2 right-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => setSelectedProduct(p)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" /> Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => remove(p.id!)}
                                    >
                                        <Trash className="w-4 h-4 mr-2" /> Excluir
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <h3 className="font-bold text-lg mb-2 truncate">{p.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{p.description}</p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <strong className="text-green-600">R$ {p.price.toFixed(2)}</strong>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    Estoque: {p.stockQuantity}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 block">
                                Criado em: {p.dtCriacao ? new Date(p.dtCriacao).toLocaleDateString('pt-BR') : '—'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Edição */}
            <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Produto</DialogTitle>
                    </DialogHeader>
                    {selectedProduct && (
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await update(
                                    selectedProduct.id,
                                    selectedProduct.name,
                                    selectedProduct.description,
                                    selectedProduct.price,
                                    selectedProduct.categoryId,
                                    selectedProduct.stockQuantity,
                                    selectedProduct.dtCriacao
                                );
                                setSelectedProduct(null);
                            }}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nome</label>
                                    <input
                                        type="text"
                                        value={selectedProduct.name}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Descrição</label>
                                    <textarea
                                        value={selectedProduct.description}
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={selectedProduct.price}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: +e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Quantidade em Estoque</label>
                                        <input
                                            type="number"
                                            value={selectedProduct.stockQuantity}
                                            onChange={(e) => setSelectedProduct({ ...selectedProduct, stockQuantity: +e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button type="submit">Salvar</Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
