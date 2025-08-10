import { Header } from '@/Components/dashboard/header';
import ProductList from '../../Components/products/ProductList';
import { Sidebar } from '@/Components/dashboard/sidebar';
import { DashboardTabs } from '@/Components/dashboard/dashboard-tabs';

export default function ProductsPage() {
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="flex items-center justify-center py-4">
                        <DashboardTabs />
                    </div>
                    <div className='m-4'>                    <h2 className="text-xl mb-4">Produtos em Estoque</h2>
                        <ProductList /></div>

                </div>
            </div>
        </>
    );
}
