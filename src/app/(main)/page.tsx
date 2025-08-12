'use client';

import ProductCard from "@/components/ProductCard";
import BrandMarquee from "@/components/BrandMarquee";
import StatsCounters from "@/components/StatsCounters";
import Typewriter from "@/components/typewriter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?limit=6')
      .then((r) => r.json())
      .then((data) => {
        const items = (data?.items ?? []).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          imageUrl: p.imageUrl,
          price: Number(p.price),
        })) as Product[];
        if (items.length === 0) {
          setProducts([
            { id: '1', name: 'Smartwatch Ultra Pro', price: 1999.99, imageUrl: '/images/smartwatch.jpg', description: 'Stay connected and track your fitness with this latest smartwatch.' },
            { id: '2', name: 'iPhone 16', price: 99999.99, imageUrl: '/images/phone.jpg', description: 'Experience blazing speed, AI features, and stunning camera performance.' },
            { id: '3', name: 'Sony WH-1000XM6', price: 14500.0, imageUrl: '/images/headphone.jpg', description: 'Industry-leading noise cancellation and immersive sound.' },
            { id: '4', name: 'HP Spectre x360', price: 62000.0, imageUrl: '/images/laptop.jpg', description: 'Ultra-slim convertible laptop with long battery life.' },
            { id: '5', name: 'Anker PowerCore', price: 3200.0, imageUrl: '/images/powerbank.jpg', description: 'Compact and powerful fast charging on the go.' },
            { id: '6', name: 'LED Ring Light', price: 2200.0, imageUrl: '/images/ringlight.png', description: 'Adjustable brightness, color temperature, and a stable tripod.' },
          ]);
        } else {
          setProducts(items);
        }
      });
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <section className="relative w-full overflow-hidden">
        <motion.div
          className="absolute -z-10 inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to ElectroMart
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your Premium Destination for Cutting-Edge Electronics
          </motion.p>
          <div className="mt-6 flex justify-center">
            <Typewriter />
          </div>
          <motion.a
            href="/products"
            className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
            whileTap={{ scale: 0.98 }}
          >
            Shop Now
          </motion.a>
        </div>
      </section>

      <BrandMarquee />

      <section className="w-full px-6 py-6">
        <StatsCounters />
      </section>

      <section className="w-full px-6 py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto pb-10">
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants} className="flex justify-center">
              <ProductCard id={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} description={product.description} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
