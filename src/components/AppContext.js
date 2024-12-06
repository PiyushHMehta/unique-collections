'use client'

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({})

export function cartItemsPrice(cartItem) {
    let price = cartItem.basePrice
    if (cartItem.size) {
        price += cartItem.size.price
    }
    if (cartItem.colors?.length > 0) {
        for (const color of cartItem.colors) {
            price += color.price
        }
    }

    return price
}

export function AppProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const ls = typeof window !== 'undefined' ? window.localStorage : null

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartItems(JSON.parse(ls.getItem('cart')))
        }
    }, [])

    function saveCartItemsToLocalStorage(cartItems) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartItems))
        }
    }

    function addToCart(product, size = null, colors = []) {
        setCartItems(prev => {
            const cartItem = { ...product, size, colors }
            const newItems = [...prev, cartItem]
            saveCartItemsToLocalStorage(newItems)
            return newItems
        })
    }

    function clearCart() {
        setCartItems([])
        ls.setItem('cart', [])
    }

    function removeCartItem(indexToRemove) {
        setCartItems(prev => {
            const remainingCartItems = prev.filter((_, index) => index !== indexToRemove)
            saveCartItemsToLocalStorage(remainingCartItems) // Update localStorage
            return remainingCartItems
        })
        toast.success('Item removed')
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeCartItem, clearCart }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}