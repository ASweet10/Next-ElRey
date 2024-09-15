'use client'

import AddressInputs from "@/components/AddressInputs"
import { CartContext, cartProductPrice } from "@/components/AppContext"
import { useParams } from "next/navigation"
import { useEffect, useContext, useState } from "react"
import CartProduct from "@/components/CartProduct"

export default function OrderPage() {
    const {clearCart} = useContext(CartContext)
    const {id} = useParams()
    const [ order, setOrder ] = useState()
    const [ loadingOrder, setLoadingOrder ] = useState(true)

    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes("clear-cart=1")) {
                clearCart()
            }
        }
        if (id) {
            setLoadingOrder(true)
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData)
                    setLoadingOrder(false)
                })
            })
        }
    }, [])

    let subTotal = 0
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subTotal += cartProductPrice(product)
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className=" text-center">
                <h1 className="text-4xl text-primary font-bold">Your Order</h1>
                <div className="my-4">
                    <p>Thank you for your order.</p>
                    <p>We will call you when your order is ready for pickup.</p>
                </div>
            </div>
            { loadingOrder && (
                <div>Loading order...</div>
            )}

            { order && (
                <div className="flex flex-col md:grid grid-cols-2 gap-8">
                    <div>
                        {order.cartProducts?.map(product => (
                            <CartProduct key={product._id} product={product}/>
                        ))}
                        <div className="py-2 text-right text-xl">
                            Subtotal: <span className="font-bold">${subTotal}</span>
                        </div>
                        <div className="py-2 text-right text-xl">
                            Delivery Fee: <span className="font-bold">$5</span>
                        </div>
                        <div className="py-2 text-right text-xl">
                            Total: <span className="font-bold">${subTotal + 5}</span>
                        </div>
                    </div>
                    <div>
                        <div className="p-4 rounded-lg flex flex-col">
                            <AddressInputs disabled={true} addressProps={...order} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}