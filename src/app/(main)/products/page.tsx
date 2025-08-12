'use client';

import { useEffect, useRef, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

type Product = { id: string; name: string; description: string; imageUrl: string; price: number };

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  async function loadMore(nextPage: number) {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${nextPage}&limit=12`);
      const data = await res.json();
      const newItems: Product[] = (data.items ?? []).map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        price: Number(p.price),
      }));
      setItems((prev) => [...prev, ...newItems]);
      setHasMore(Boolean(data.hasMore));
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        loadMore(page + 1);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <ProductCard id={p.id} name={p.name} description={p.description} imageUrl={p.imageUrl} price={p.price} />
            </motion.div>
          ))}
        </div>
        {loading && <p className="text-center mt-6 text-gray-400">Loading...</p>}
        <div ref={sentinelRef} className="h-10" />
      </div>
    </div>
  );
}


