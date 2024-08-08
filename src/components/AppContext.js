'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;
    if (cartProduct.size) {
        price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price
        }
    }

    return price
}

// useSession in Navbar needs to be wrapped in SessionProvider
// This is used in layout.js
export function AppProvider({children}) {
    const [ cartProducts, setCartProducts ] = useState([])
    const localStorage = typeof window !== 'undefined' ? window.localStorage : null

    function saveCartProductsToLocalStorage(cartProducts) {
        if(localStorage) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    function addToCart(product, size=null, extras=[]) {
        setCartProducts(previousProducts => {
            console.log('previous products' + previousProducts)
            const cartProduct = {...product, size, extras}
            const newProducts = [...previousProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts
        })
    }

    function clearCart() {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(previousProducts => {
            const newCartProducts = previousProducts.filter((v, index) => index !== indexToRemove)
            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts
        })
        toast.success('Item removed')
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart, clearCart, removeCartProduct
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}