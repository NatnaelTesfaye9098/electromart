'use client';

import {useCart} from "@/context/cartContext";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {motion, AnimatePresence} from "framer-motion";

export default function CartPage() {

    const {cart, updateItemQuantity, removeFromCart} = useCart();
    const totalPrice = cart.reduce((sum, item)=> sum+(item.price*item.quantity), 0);

    const handleUpdateQuantity = (id:string, newQuantity:number) => {
        updateItemQuantity(id, newQuantity);
    };

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    }

    const itemVariants = {
        hidden: {opacity:0, y:200},
        visible: {opacity:1, y:0, transition:{duration:0.3}},
        exit: {opacity:0, y:-20, transition:{duration:0.2}}
    };

    const containerVariants = {
        hidden: {opacity:0},
        visible:{opacity:1, transition:{staggerChildren:1}}
    };

    return(
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>
                {cart.length === 0 ? (
                    <div className="text-center text-gray-900 text-xl mt-20">
                        <p className="mb-8 text-white">Your cart is empty!</p>
                        <Link href="/" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div>
                        <AnimatePresence>
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                                {cart.map((item) => (
                                    <motion.div key={item.id} variants={itemVariants} exit="exit" layout className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
                                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                                        <div className="flex-grow">
                                            <h2 className="text-xl font-semibold text-blue-300">{item.name}</h2>
                                            <p className="text-gray-400">Price: ETB {Number(item.price).toFixed(2)}</p>
                                            <p className="text-gray-300">Quantity: {item.quantity}</p>
                                            

                                            <div className="flex items-center justify-start mt-2 space-x-2">
                                                <Button onClick={()=> handleUpdateQuantity(item.id, item.quantity-1)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 cursor-pointer" disabled={item.quantity <= 1}>-</Button>
                                                <span className="text-lg font-semibold">{item.quantity}</span>
                                                <Button onClick={()=> handleUpdateQuantity(item.id, item.quantity+1)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md transition-colors duration-200 cursor-pointer focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">+</Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center md:items-end ml-auto mt-4 mg:mt-0">
                                            <span className="text-xl font-bold text-blue-400">
                                                ETB {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <Button onClick={()=> handleRemoveItem(item.id)} className="mt-3 bg-blue-600 hover:bg-blue-700 font-semibold text-white text-sm py-2 px-3 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer">
                                                Remove from Cart
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center">
                            <span className="text-3xl font-bold">Total:</span>
                            <span className="text-3xl font-extrabold text-blue-500">ETB {totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="mt-8 text-center">
                            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 cursor-pointer">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}