'use client';

import {useCart} from "@/context/cartContext";
import Link from 'next/link';

export default function CartPage() {

    const {cart} = useCart();
    const totalPrice = cart.reduce((sum, item)=> sum+(Number(item.price)*Number(item.quantity)), 0);

    return(
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>
                {cart.length === 0 ? (
                    <div className="text-center text-gray-900 text-xl">
                        <p className="mb-4">Your cart is empty!</p>
                        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h24 object-cover rounded-md mr-4" />
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold text-blue-300">{item.name}</h2>
                                        <p className="text-gray-400">Price: ETB{Number(item.price).toFixed(2)}</p>
                                        <p className="text-gray-300">Quantity: ETB{item.quantity}</p>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-400">
                                        ETB {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center">
                            <span className="text-3xl font-bold">Total:</span>
                            <span className="text-4xl font-extrabold text-blue-500">ETB {totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="mt-8 text-center">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-200">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}