'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Brand = { id: string; name: string; logoUrl?: string | null };

const FALLBACK_BRANDS: Brand[] = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'sony', name: 'Sony' },
  { id: 'hp', name: 'HP' },
  { id: 'anker', name: 'Anker' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'dell', name: 'Dell' },
  { id: 'lenovo', name: 'Lenovo' },
  { id: 'oneplus', name: 'OnePlus' },
  { id: 'logitech', name: 'Logitech' },
];

export default function BrandMarquee() {
  const [brands, setBrands] = useState<Brand[]>(FALLBACK_BRANDS);

  useEffect(() => {
    fetch('/api/brands')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.items) && data.items.length > 0) {
          setBrands(data.items);
        }
      })
      .catch(() => void 0);
  }, []);

  const loopItems = useMemo(() => [...brands, ...brands, ...brands], [brands]);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent" />
      <motion.div
        className="flex gap-10"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {loopItems.map((b, i) => (
          <motion.div
            key={`${b.id}-${i}`}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-800/60 border border-gray-700/60 shadow-sm"
            whileHover={{ scale: 1.06 }}
          >
            {b.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={b.logoUrl} alt={b.name} className="h-6 w-6 object-contain" />
            ) : (
              <div className="h-6 w-6 rounded bg-blue-500/70" />
            )}
            <span className="text-sm font-semibold text-gray-200">{b.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


