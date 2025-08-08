import Link from 'next/link';
import ProductList from '../Components/products/ProductList';
import LoginForm from '@/Components/forms/LoginForm';


export default async function Home() {
  return (
    <>


      <section>
        <LoginForm />
      </section>
    </>
  );
}
