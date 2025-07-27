'use client';

import Image from 'next/image';
import { useCart } from "@/context/cartContext";
import {Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

export default function ProductCard({id, name, price, imageUrl, description}: ProductCardProps) {

    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart({
            id,
            name,
            price,
            imageUrl,
            quantity: 1,
            });
    };

    return(
        <Card className="pt-0 bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full border border-gray-700">
            <Image src={imageUrl} alt={name} width={300} height={250} className="w-full h-50 object-cover"/>
            <CardContent className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-semibold text-blue-400">ETB {price.toFixed(2)}</span>
                    <Button onClick={handleAddToCart} variant="default" size="default" className="w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer">
                       Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}