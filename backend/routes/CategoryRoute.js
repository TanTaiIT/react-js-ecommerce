import Product from './../models/ProductModel.js'
import Category from '../models/Category.js'
import asyncHandler from 'express-async-handler'
import express from 'express'
const CategoryRoute = express.Router()
CategoryRoute.get('/', asyncHandler(async (req, res) => {
    const category = await Category.find({})
    if (!category) return res.status(400).json({ msg: 'No data' })
    res.status(200).json(category)
}))
CategoryRoute.get('/:cateId', asyncHandler(async (req, res) => {
    const cateId = req.params.cateId
    if (cateId !== 'empty') {
        const cate = await Category.find({ name: cateId })
        if (!cate) return res.status(404).json({ msg: "This category is not exist" })
        const product = await Product.find({ category: cateId })
        if (!product) return res.status(404).json({ msg: "This category is No Product" })
        res.status(200).json(product)
    } else {
        const product = await Product.find({})
        res.status(200).json(product)
    }

}))

export default CategoryRoute