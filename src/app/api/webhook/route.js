const stripe = require('stripe')(process.env.STRIPE_SK)
import { Order } from '@/models/orders'
import { buffer } from 'micro'

export async function POST(req) {
    // Using this https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
    const sig = req.headers.get('stripe-signature')
    let event

    try {
        const regBuffer = await req.text()
        const signSecret = process.env.STRIPE_SIGN_SECRET
        event = stripe.webhooks.constructEvent(regBuffer, sig, signSecret)
    } catch (error) {
        console.log(error)
        return Response.json(e, {status: 400})
    }

    if(event.type === 'checkout.session.completed') {
        console.log(event)
        const orderId = event?.data?.object?.metadata?.orderId
        const isPaid = event?.data?.object?.payment_status === 'paid'
        if(isPaid) {
            await Order.updateOne({_id: orderId}, { paid:true })
        }
    }

    return Response.json('ok', {status: 200})
}