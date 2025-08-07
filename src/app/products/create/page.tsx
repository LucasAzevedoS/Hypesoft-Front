'use client'

import ProductForm from "@/Components/forms/ProductForm";

export default function CreateProductPage() {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl mb-4">Criar produto</h2>
            <ProductForm />
        </div>
    );
}