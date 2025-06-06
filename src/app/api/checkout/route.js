import mongoose from "mongoose"
import { authOptions } from "../auth/[...nextauth]/route"
import { Order } from "@/models/orders"
import { MenuItem } from "@/models/menuItem"
const stripe = require('stripe')(process.env.STRIPE_SK)
import { getServerSession } from "next-auth"

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)

    const { cartProducts, address } = await req.json()
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email

    const orderDocument = await Order.create({
        userEmail,
        ...address, // All address strings: phone, streetAddress, city, etc.
        cartProducts,
        paid: false
    })

    const stripeLineItems = []
    
    for (const cartProduct of cartProducts) {
        const productInfo = await MenuItem.findById(cartProduct._id)

        let productPrice = productInfo.basePrice
        if (cartProduct.size) {
            const size = productInfo.sizes
                .find(size => size._id.toString() === cartProduct.size._id.toString())
            productPrice += size.price
        }
        if (cartProduct.extras?.length > 0) {
            for (const cartProductExtraIngredient of cartProduct.extras) {
                const productExtras = productInfo.extraIngredientPrices
                const extraIngredientInfo = productExtras
                    .find(extra => extra._id.toString() === cartProductExtraIngredient._id.toString()) // Ensure you are comparing strings & not objects
                productPrice += extraIngredientInfo.price
            }
        }
        const productName = cartProduct.name

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: productName
                },
                unit_amount: productPrice * 100
            }
        })
    }
    
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/'+ orderDocument._id.toString(),
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId: orderDocument._id.toString()},
        payment_intent_data: {
            metadata: {orderId: orderDocument._id.toString()}
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 500, currency: 'USD'},
                }
            }
        ]
    })
    return Response.json(stripeSession.url)
}