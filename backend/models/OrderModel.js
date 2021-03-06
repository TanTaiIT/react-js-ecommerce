import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: { type: String, required: true }, quantity: { type: Number, required: true, default: 0 }, image: { type: String, required: true }, price: { type: Number, required: true },
            // product: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     required: true,
            //     ref: "Product"
            // }
        }
    ],
    shippingMethod: {
        type: String,
        required: true,
        default: "Paypal"
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDiliverd: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, { timestamp: true })
const Order = mongoose.model("Order", OrderSchema)
export default Order