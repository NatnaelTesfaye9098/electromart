'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Category = { id: string; name: string; slug: string };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.items ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <motion.a
              key={c.id}
              href={`/products?categoryId=${c.id}`}
              className="rounded-xl border border-gray-700 bg-gray-800 p-6 hover:border-blue-500 transition-colors"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="text-gray-400 text-sm">Explore the latest in {c.name}.</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}


