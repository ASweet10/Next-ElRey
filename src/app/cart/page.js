'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext"
import { useContext, useState, useEffect } from "react"
import Image from "next/image"

import AddressInputs from "@/components/AddressInputs"
import { useProfileInfo } from "@/hooks/useProfileInfo"
import toast from "react-hot-toast"
import CartProduct from "@/components/CartProduct"

export default function CartPage () {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const [ address, setAddress ] = useState({})
    const { data:profileData } = useProfileInfo()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed :(')
            }
        }
    }, [])

    useEffect(() => {
        if(profileData?.city) {
            const { phone, streetAddress, city, zipCode, usState } = profileData
            const dataFromProfile = { phone, streetAddress, city, zipCode, usState }
            setAddress(dataFromProfile)
        }
        console.log(cartProducts)
    }, [profileData])
    
    let subTotal = 0
    for (const product of cartProducts) {
        subTotal += cartProductPrice(product)
    }
    
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => {
            return {...prevAddress, [propName]:value}
        })
    }
    
    async function proceedToCheckout(e) {
        e.preventDefault()
        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    address, cartProducts,
                })
            }).then(async (response) => {
                if (response.ok) {
                    resolve()
                    window.location = await response.json()
                } else {
                    reject()
                }
            })
        })

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again',
        })
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <h1 className="text-4xl text-yellow-700 font-bold font-cormorant">Cart</h1>
                <p className="mt-4">Your cart is empty.</p>
            </section>
        )
    }
    
    return (
        <section className="m-8">
            <h2 className="font-bold text-center text-5xl text-yellow-700 font-cormorant mb-8">Cart</h2>
            <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                    { cartProducts?.length === 0 && (
                        <div>No items in cart</div>
                    )}
                    { cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct key={index} product={product} onRemove={removeCartProduct} index={index} />
                    ))}
                    <div className="py-2 text-right pr-16 text-xl">
                        Subtotal: <span className="font-bold">${subTotal}</span>
                    </div>
                    <div className="py-2 text-right pr-16 text-xl">
                        Delivery Fee: <span className="font-bold">$5</span>
                    </div>
                    <div className="py-2 text-right pr-16 text-xl">
                        Total: <span className="font-bold">${subTotal + 5}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mx-6 bg-gray-900 rounded-lg p-4">
                    <h2 className="font-bold text-xl">Checkout</h2>
                    <form className="flex flex-col gap-2" onSubmit={proceedToCheckout}>
                        <AddressInputs 
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit"
                            className="flex p-2 items-center justify-center gap-2 text-xl bg-yellow-700 rounded-lg"
                        >
                            Pay ${subTotal !== 0 ? subTotal + 5 : 0}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}