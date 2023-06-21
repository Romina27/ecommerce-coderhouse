import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    code: String,
    title: String,
    price: Number,
    thumbnails: [String],
    description: String,
    stock: Number,
    category: String,
    status: Boolean
})

const Product = model('Product', productSchema)

export default Product