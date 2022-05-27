import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    review: [reviewSchema],
    rating: {
        required: true,
        type: Number,
        default: 0
    },
    numberReview: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    km: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Types.ObjectId, ref: "Category", required: true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product