import express from 'express'
import Product from './../models/ProductModel.js'
import asyncHandler from 'express-async-handler'
import protect from '../middleware/AuthMiddleware.js'
const productRoute = express.Router()

productRoute.get('/', asyncHandler(async (req, res) => {
    const pageSize = 6
    const Page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}
    const count = await Product.countDocuments({ ...keyword })
    const product = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * Page - 1).sort({ _id: -1 })
    res.json({ product, Page, pages: Math.ceil(count / pageSize) })
}))

productRoute.get('/:id', asyncHandler(async (req, res) => {
    try {
        const productDetail = await Product.findById(req.params.id)
        res.json(productDetail)
    } catch (error) {
        res.status(404)
        throw new Error('Product no Found')
    }

}))
productRoute.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json({ msg: "success" })
    } catch (error) {
        res.status(404)
        throw new Error('Product not Found')
    }
}))

productRoute.post("/:id/review", protect, asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alredyReview = product.review.find((r) => r.user.toString() === req.user._id.toString())
        if (alredyReview) {
            res.status(400)
            throw new Error("You are alredy review on this product")
        }
        const reviews = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.review.push(reviews)
        product.numberReview = product.review.length
        product.rating = product.review.reduce((r, i) => r + i.rating, 0) / product.review.length
        await product.save()
        res.status(201).json({ message: "Review add" })
    } else {
        res.status(404)
        throw new Error("Product not Found")
    }
}))
export default productRoute