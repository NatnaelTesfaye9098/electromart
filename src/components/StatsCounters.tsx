'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

type Stats = { products: number; brands: number; categories: number };

function Counter({ to, label }: { to: number; label: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.4, ease: 'easeOut' });
    return controls.stop;
  }, [to, count]);

  return (
    <div className="flex flex-col items-center p-4">
      <motion.span className="text-4xl font-extrabold text-blue-400">{rounded}</motion.span>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
}

export default function StatsCounters() {
  const [stats, setStats] = useState<Stats>({ products: 0, brands: 0, categories: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => setStats(data as Stats))
      .catch(() => void 0);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
      <Counter to={stats.products} label="Products" />
      <Counter to={stats.brands} label="Brands" />
      <Counter to={stats.categories} label="Categories" />
    </div>
  );
}


