'use client';

import { useEffect, useState } from 'react';
import { useProductStorepaged, useProductStore } from '@/stores/useProductStore';
import { Button } from '../ui/button';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog';

export default function ProductList() {
    const { products, fetchPage, loading, page, totalPages, hasNextPage, hasPreviousPage } =
        useProductStorepaged();


    const { remove, update } = useProductStore();

    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        fetchPage(1);
    }, [fetchPage]);

    const handleDelete = async (productId: string) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await remove(productId);

                fetchPage(page);
            } catch (error) {
                alert('Erro ao excluir produto');
                console.error(error);
            }
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Atualizando produto ID:', selectedProduct.id); // Debug

            await update(
                selectedProduct.id,
                selectedProduct.name,
                selectedProduct.description,
                selectedProduct.price,
                selectedProduct.categoryId || '',
                selectedProduct.stockQuantity,
                selectedProduct.dtCriacao || new Date()
            );

            setSelectedProduct(null);

            fetchPage(page);
            alert('Produto atualizado com sucesso!');
        } catch (error) {
            alert('Erro ao atualizar produto');
            console.error('Erro na atualização:', error);
        }
    };

    if (loading) return <div className="text-center py-8">Carregando...</div>;
    if (!products.length) return <div className="text-center py-8 text-gray-500">Nenhum produto cadastrado</div>;

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((p) => (
                    <div key={p.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative">

                        <div className="absolute top-2 right-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => setSelectedProduct(p)}
                                        className="cursor-pointer"
                                    >
                                        <Edit className="w-4 h-4 mr-2" /> Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => handleDelete(p.id!)}
                                    >
                                        <Trash className="w-4 h-4 mr-2" /> Excluir
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <h3 className="font-bold text-lg mb-2 pr-8 truncate">{p.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{p.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <strong className="text-green-600">R$ {p.price.toFixed(2)}</strong>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                Estoque: {p.stockQuantity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-center space-x-2">
                <Button
                    variant="outline"
                    onClick={() => fetchPage(page - 1)}
                    disabled={!hasPreviousPage}
                >
                    Anterior
                </Button>
                <span className="px-3 py-2 border rounded bg-gray-50">
                    Página {page} de {totalPages}
                </span>
                <Button
                    variant="outline"
                    onClick={() => fetchPage(page + 1)}
                    disabled={!hasNextPage}
                >
                    Próxima
                </Button>
            </div>

            <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
                <DialogContent className="max-w-md mx-auto bg-white rounded-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold mb-4">
                            Editar Produto
                        </DialogTitle>
                    </DialogHeader>

                    {selectedProduct && (
                        <form onSubmit={handleUpdate}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nome</label>
                                    <input
                                        type="text"
                                        value={selectedProduct.name || ''}
                                        onChange={(e) => setSelectedProduct({
                                            ...selectedProduct,
                                            name: e.target.value
                                        })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Descrição</label>
                                    <textarea
                                        value={selectedProduct.description || ''}
                                        onChange={(e) => setSelectedProduct({
                                            ...selectedProduct,
                                            description: e.target.value
                                        })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                            value={selectedProduct.price || 0}
                                            onChange={(e) => setSelectedProduct({
                                                ...selectedProduct,
                                                price: parseFloat(e.target.value) || 0
                                            })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Estoque</label>
                                        <input
                                            type="number"
                                            value={selectedProduct.stockQuantity || 0}
                                            onChange={(e) => setSelectedProduct({
                                                ...selectedProduct,
                                                stockQuantity: parseInt(e.target.value) || 0
                                            })}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}