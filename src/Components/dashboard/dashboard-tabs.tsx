"use client"



import { DashboardTabsProps } from "@/types/dashboard";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductList from "../products/ProductList";
import { Button } from "../ui/button";
import Link from "next/link";




function PlaceholderContent({ title, description }: { title: string; description: string }) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">{title}</h3>
                    <p className="text-gray-500">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
    return (
        <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
            <TabsList className="gap-4">
                <Link href={"../dashboard"}>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                </Link>
                <Link href={"../products"}>
                    <TabsTrigger value="products">Product List</TabsTrigger>
                </Link>
                <Link href={"./products/create"}>
                    <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
                </Link>
                <Link href={"../charts"}>
                    <TabsTrigger value="sales">Graficos de Produtos</TabsTrigger>
                </Link>
            </TabsList>

        </Tabs >
    )
}
