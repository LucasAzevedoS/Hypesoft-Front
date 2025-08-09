'use client'

import { DashboardTabs } from "@/Components/dashboard/dashboard-tabs";
import { Header } from "@/Components/dashboard/header";
import { MetricsCards } from "@/Components/dashboard/MetricsCard";
import { Sidebar } from "@/Components/dashboard/sidebar";
import ProductList from "@/Components/products/ProductList";
import ProductListDt from "@/Components/products/ProductListDt";


export default function DashboardPage() {
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div>
                        <DashboardTabs />
                    </div>
                    <main className="flex-1 p-6 bg-gray-50">
                        <MetricsCards />
                        <ProductListDt />
                    </main>

                </div>
            </div>
        </>
    );
}