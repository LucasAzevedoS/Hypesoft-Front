'use client'

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { productService } from "@/services/productService"
import { Category } from "@/types/category"
import { categoryService } from "@/services/categoryService"

export default function ProductsByCategoryChart() {
    const [data, setData] = useState<{ name: string; total: number }[]>([])

    useEffect(() => {
        async function fetchData() {
            const products = await productService.getAll()
            const categories = await categoryService.getAll()


            const counts: Record<string, number> = {}
            products.forEach((p: any) => {
                counts[p.categoryId] = (counts[p.categoryId] || 0) + 1
            })


            const chartData = categories.map((cat: Category) => ({
                name: cat.name,
                total: counts[cat.id] || 0
            }))

            setData(chartData)
        }

        fetchData()
    }, [])

    return (
        <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Produtos por Categoria</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
