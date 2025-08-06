import Link from 'next/link';
import ProductList from '../Components/products/ProductList';

export default async function Home() {
  // ProductList será cliente — pode buscar usando client-side hook
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hypesoft Store</h1>
        <Link href="/products/create" className="btn">Criar produto</Link>
      </div>

      <section>
        <ProductList />
      </section>
    </>
  );
}
