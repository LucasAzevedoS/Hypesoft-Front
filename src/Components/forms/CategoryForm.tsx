'use client'

import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/category";
import { useState } from "react";

export default function CategoryForm() {
    const [form, setform] = useState<Category>({
        id: "",
        name: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.name.trim()) {
            alert('Por favor, digite o nome da categoria');
            return;
        }

        setIsSubmitting(true);

        try {
            await categoryService.create(form);
            alert('Categoria criada com sucesso!');
            setform({
                id: '',
                name: '',
            });
        } catch (error) {
            alert('Erro ao criar categoria. Tente novamente.');
            console.error('Erro:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                    <label
                        htmlFor="categoryName"
                        className="block text-sm font-medium  mb-2"
                    >
                        Crie uma Categoria
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        placeholder="Digite o nome da categoria"
                        value={form.name}
                        onChange={(e) => setform({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !form.name.trim()}
                    className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 whitespace-nowrap"
                >
                    {isSubmitting ? 'Criando...' : 'Criar'}
                </button>
            </form>
        </div>
    );
}