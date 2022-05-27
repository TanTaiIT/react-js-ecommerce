import express from 'express'
// import User from './models/UserModel.js'
// import users from './data/User.js'
import category from './data/Categoy.js'
import Category from './models/Category.js'
import Product from './models/ProductModel.js'
import products from './data/Products.js'
const importData = express.Router()

// importData.post('/user', async (req, res) => {
//     await User.remove({})
//     const importUser = await User.insertMany(users)
//     res.send({ importUser })
// })
importData.post('/category', async (req, res) => {
    const importCate = await Category.insertMany(category)
    res.send({ importCate })
})
importData.post('/product', async (req, res) => {
    // await Product.remove({})
    const importProduct = await Product.insertMany(products)
    res.send({ importProduct })
})
export default importData