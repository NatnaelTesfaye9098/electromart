'use client';

import Link from 'next/link';
import { useCart } from '@/context/cartContext';

export default function Navbar(){

    const {cart} = useCart();

    const totalItemsInCart = cart.reduce((total, item) => total+item.quantity, 0);

    return(
        <nav className="bg-gray-800 text-white p-6 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    ElectroMart
                </Link>

                <div className="space-x-6 flex items-center">
                    <Link href="/" className="hover:text-blue-300 transition-colors duration-200">
                        Home
                    </Link>
                    <Link href="/products" className="hover:text-blue-300 transition-colors duration-200">Products</Link>
                    <Link href="/categories" className="hover:text-blue-300 transition-colors duration-200">Categories</Link>

                    <Link href="/cart" className="relative hover:text-blue-300 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill='none' viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {totalItemsInCart > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {totalItemsInCart}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}