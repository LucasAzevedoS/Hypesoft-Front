'use client'

import { useEffect, useState } from "react"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from "recharts"
import { productService } from "@/services/productService"
import { categoryService } from "@/services/categoryService"
import { Category } from "@/types/category"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"]

export default function DashboardCharts() {
    const [productsByCategory, setProductsByCategory] = useState<{ name: string; total: number }[]>([])
    const [stockByCategory, setStockByCategory] = useState<{ name: string; stock: number }[]>([])

    useEffect(() => {
        async function fetchData() {
            const products = await productService.getAll()
            const categories = await categoryService.getAll()


            const productCount: Record<string, number> = {}
            const stockCount: Record<string, number> = {}

            products.forEach((p: any) => {
                productCount[p.categoryId] = (productCount[p.categoryId] || 0) + 1
                stockCount[p.categoryId] = (stockCount[p.categoryId] || 0) + p.stockQuantity
            })


            const productData = categories.map((cat: Category) => ({
                name: cat.name,
                total: productCount[cat.id] || 0
            }))

            const stockData = categories.map((cat: Category) => ({
                name: cat.name,
                stock: stockCount[cat.id] || 0
            }))

            setProductsByCategory(productData)
            setStockByCategory(stockData)
        }

        fetchData()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Produtos por Categoria</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productsByCategory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Estoque por Categoria</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={stockByCategory}
                            dataKey="stock"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label
                        >
                            {stockByCategory.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
