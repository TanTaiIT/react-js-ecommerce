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
    // const Page = Number(req.query.pageNumber) || 1
    // const keyword = req.query.keyword ? {
    //     name: {
    //         $regex: req.query.keyword,
    //         $options: "i"
    //     }
    // } : {}
    // const count = await Product.countDocuments({ ...keyword })
    // const product = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * Page - 1).sort({ _id: -1 })
    // res.json({ product, Page, pages: Math.ceil(count / pageSize) })
    const pageSize = 6
    const cateId = req.params.cateId
    const Page = Number(req.query.pageNumber) || 1
    // const count = await Product.countDocuments({ category: cateId })

    if (cateId !== 'empty') {
        const cate = await Category.find({ name: cateId })
        if (!cate) return res.status(404).json({ msg: "This category is not exist" })
        // const product = await Product.find({ category: cateId })
        const countProduct = await Product.countDocuments({ category: cateId })
        const pro = await Product.find({ category: cateId }).limit(pageSize).skip(pageSize * Page - 1).sort({ _id: -1 })


        if (!pro) return res.status(404).json({ msg: "This category is No Product" })
        res.status(200).json({ countProduct, pro, Page, pages: Math.ceil(countProduct / pageSize) })
    } else {
        const countProduct = await Product.countDocuments({})
        const pro = await Product.find({}).limit(pageSize).skip(pageSize * Page - 1).sort({ _id: -1 })
        res.status(200).json({ pro, Page, pages: Math.ceil(countProduct / pageSize) })
    }

}))

export default CategoryRoute