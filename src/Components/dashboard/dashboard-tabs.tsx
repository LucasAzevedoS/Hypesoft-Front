"use client"



import { DashboardTabsProps } from "@/types/dashboard";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductList from "../products/ProductList";




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
            <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Product List</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
                <TabsTrigger value="sales">Sales Performance</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
            </TabsList>


            <TabsContent value="products">
                <PlaceholderContent title="Product List" description="Product management interface would go here." />
                <ProductList />
            </TabsContent>

            <TabsContent value="inventory">
                <PlaceholderContent title="Inventory Management" description="Inventory tracking interface would go here." />
            </TabsContent>

            <TabsContent value="sales">
                <PlaceholderContent title="Sales Performance" description="Sales analytics interface would go here." />
            </TabsContent>

            <TabsContent value="marketing">
                <PlaceholderContent title="Marketing" description="Marketing tools interface would go here." />
            </TabsContent>

            <TabsContent value="feedback">
                <PlaceholderContent title="Customer Feedback" description="Customer feedback interface would go here." />
            </TabsContent>
        </Tabs>
    )
}
