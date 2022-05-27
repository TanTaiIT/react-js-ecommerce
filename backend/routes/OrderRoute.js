import express from 'express'
import asyncHandler from 'express-async-handler'
import protect from './../middleware/AuthMiddleware.js'
import Order from './../models/OrderModel.js'

const orderRouter = express.Router()

orderRouter.post('/', protect, asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order Item")

    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            user: req.user._id,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)

    }
}))

orderRouter.get('/:id', asyncHandler(async (req, res) => {
    const OrderById = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if (OrderById) {
        res.json(OrderById)
    } else {
        res.status(404)
        throw new Error("Order not Founded")
    }
}))

orderRouter.put('/:id/paid', protect, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }
        const updateOrder = await order.save()
        res.json(updateOrder)

    } else {
        res.status(404)
        throw new Error('Order not Found')
    }

}))

orderRouter.get('/', protect, asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 })
    res.json(order)
}))

export default orderRouter