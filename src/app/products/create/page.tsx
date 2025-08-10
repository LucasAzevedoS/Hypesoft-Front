'use client'

import { DashboardTabs } from "@/Components/dashboard/dashboard-tabs";
import { Header } from "@/Components/dashboard/header";
import ProductsByCategoryChart from "@/Components/charts/ProductsByCategoryChart";
import { Sidebar } from "@/Components/dashboard/sidebar";
import ProductForm from "@/Components/forms/ProductForm";
import DashboardCharts from "@/Components/charts/DashboardCharts";
import CategoryForm from "@/Components/forms/CategoryForm";

export default function CreateProductPage() {
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="flex items-center justify-center py-4">
                        <DashboardTabs />
                    </div>

                    <ProductForm />
                </div>
            </div>
        </>
    );
}