'use client';

import {createContext, useContext, useState, ReactNode} from 'react';

interface CartItem{
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartContextType{
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateItemQuantity: (id: string, newQuantity: number) => void;
    removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType|undefined>(undefined);

interface CartProviderProps{
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    
    const addToCart = (itemToAdd:CartItem) => {
        setCart((prev)=>{
            const existingItemIndex = prev.findIndex(item => item.id === itemToAdd.id);

            if(existingItemIndex>-1){
                const updatedCart = [...prev];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + itemToAdd.quantity,
                }
                return updatedCart;
            }else{
                return [...prev, {...itemToAdd}]; 
            }
        });
        console.log("Adding to Cart..");
    };

    const updateItemQuantity = (id: string, newQuantity: number) => {
        setCart((prev) => {
            if(newQuantity<=0){
                return prev.filter((item)=>item.id !== id);
            }else{
                const updatedCart = prev.map((item) => item.id === id ? {...item, quantity: newQuantity} : item);
                return updatedCart;
            }
        })
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => {
            return prev.filter((item) => item.id !==  id);
        });
    };

    const contextValue:CartContextType = {
        cart,
        addToCart,
        updateItemQuantity,
        removeFromCart,
    };

    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === undefined){
        throw new Error('Use cart shall always be called inside the CartProvider');
    }
    return context;
};