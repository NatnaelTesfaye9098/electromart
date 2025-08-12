'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/cartContext';
import { useSession, signIn } from 'next-auth/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import UserStatus from './user-status';
import HamburgerButton from './hamburger-button';


export default function Navbar() {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-md border-b shadow-md shadow-black/30">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-400">ElectroMart</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium hover:text-blue-300 transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-blue-300 transition-colors">
            Categories
          </Link>
          <Link href="/cart" className="relative text-sm font-medium hover:text-blue-300 transition-colors">
            <ShoppingCart className="h-7 w-7" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          {session ? (
            <UserStatus />
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/register" className="text-sm font-medium hover:text-blue-300 transition-colors">
                Sign up
              </Link>
              <Button onClick={() => signIn()} className="rounded-full">
                Login
              </Button>
            </div>
          )}
        </nav>

        <div className="md:hidden flex items-center space-x-2">
          <Link href="/cart" className="relative hover:text-blue-300 transition-colors">
            <ShoppingCart className="h-7 w-7" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <HamburgerButton isOpen={isOpen}/>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 py-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</Link>
                <Link href="/products" onClick={() => setIsOpen(false)} className="text-lg font-medium">Products</Link>
                <Link href="/categories" onClick={() => setIsOpen(false)} className="text-lg font-medium">Categories</Link>
                
                <div className="mt-4 pt-4 border-t">
                  {session ? (
                    <UserStatus />
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Button onClick={() => signIn()} className="w-full">
                        Login
                      </Button>
                      <Link href="/register" onClick={() => setIsOpen(false)} className="text-center text-sm font-medium">
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}