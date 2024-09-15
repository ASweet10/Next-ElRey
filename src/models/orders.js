import { model, models, Schema } from "mongoose"

const OrderSchema = new Schema({
    userEmail: String,
    phone: String,
    streetAddress: String,
    zipCode: String,
    city: String,
    usState: String,
    cartProducts: Object,
    paid: {type: Boolean, default: false},
}, {timestamps: true})

export const Order = models?.Order || model('Order', OrderSchema)
