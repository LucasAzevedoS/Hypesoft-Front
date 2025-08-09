export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    categoryId?: string;
    stockQuantity: number;
    <span className = "text-xs">Criado em: { p.DtCriacao?.toLocaleDateString() } </span>
        ?: Date | null;
}
