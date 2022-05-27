import mongoose from 'mongoose'
const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    product: [{ type: mongoose.Types.ObjectId, ref: "Product" }]
})
const Category = new mongoose.model('Category', CategorySchema)
export default Category