'use client';

import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/cartContext";

export default function Home() {

  const { cart } = useCart();
  
  const products = [
  {
    id: '1',
    name : 'Smartwatch Ultra Pro',
    price: 1999.99,
    imageUrl: '/images/smartwatch.jpg',
    description: 'Stay connected and track your fitness with this latest smartwatch.',
  },
  {
    id: '2',
    name: 'iPhone 16',
    price: 99999.99,
    imageUrl: '/images/phone.jpg',
    description: 'Experience the future with blazing speed, AI features, and stunning camera performance.'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM6 Headphones',
    price: 14500.00,
    imageUrl: '/images/headphone.jpg',
    description: 'Industry-leading noise cancellation and immersive sound for music lovers.'
  },
  {
    id: '4',
    name: 'HP Spectre x360 Laptop',
    price: 62000.00,
    imageUrl: '/images/laptop.jpg',
    description: 'Ultra-slim convertible laptop with powerful performance and long battery life.'
  },
  {
    id: '5',
    name: 'Anker PowerCore 10000mAh Power Bank',
    price: 3200.00,
    imageUrl: '/images/powerbank.jpg',
    description: 'Compact and powerful, this Anker Power Bank provides fast charging on the go.'
  },
  {
    id: '6',
    name: '10-Inch LED Ring Light with Tripod',
    price: 2200.00,
    imageUrl: '/images/ringlight.png',
    description: 'Perfect for content creators – adjustable brightness, color temperature, and a stable tripod.'
  },
];

  return(
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6">
      <section className="text-center py-10 w-full max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-center drop-shadow-lg animate-fade-in-down">
          Welcome to ElectroMart!
        </h1>
        <div className="mt-4 text-center text-xl text-blue-300 font-semibold">
          Items in Cart: <span className="text-blue-200">{cart.reduce((total, item) => total+item.quantity, 0)}</span>
        </div>
      <p className="text-xl md:texl-2xl text-gray-300 animate-fade-in-up">
        Your Premium Destination for Cutting-Edge Electronics
      </p>
      <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer">
        Shop Now!
      </button>
      </section>
      <section className="grid gri-cols-1 md:grid-cols-2 lg:grid-cols 3 gap-6 max-w-7xl w-full pb-10">
        {
          products.map((product)=> (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              description={product.description}
          />
        ))}
      </section>
    </main>
  )
}
