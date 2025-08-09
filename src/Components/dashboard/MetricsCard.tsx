"use client"

import { useEffect, useState } from "react"
import { Package, AlertTriangle, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import axios from "axios"
import { Product } from "@/types/products"



export function MetricsCards() {
    const [totalProducts, setTotalProducts] = useState(0)
    const [lowStock, setLowStock] = useState(0)
    const [monthlySales, setMonthlySales] = useState(0)

    useEffect(() => {
        fetchMetrics()
    }, [])

    async function fetchMetrics() {
        try {
            const token = localStorage.getItem("token")

            const res = await axios.get<Product[]>("https://localhost:7150/api/Products/GetAll", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })

            const products = res.data
            setTotalProducts(products.length)

            const lowStockProducts = products.filter(p => p.stockQuantity <= 10).length
            setLowStock(lowStockProducts)


            setMonthlySales(Math.floor(Math.random() * 200) + 50)

        } catch (err) {
            console.error("Erro ao buscar métricas:", err)
        }
    }

    const metrics = [
        {
            title: "Total de Produtos",
            value: totalProducts,
            icon: <Package className="w-6 h-6 text-blue-500" />,
        },
        {
            title: "Baixo Estoque",
            value: lowStock,
            icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
        },
        {
            title: "Vendas (Últimos meses)",
            value: monthlySales,
            icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric, index) => (
                <Card key={index} className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                        {metric.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
