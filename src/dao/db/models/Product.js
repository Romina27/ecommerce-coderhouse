import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

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

productSchema.plugin(paginate)

const Product = model('Product', productSchema)

export default Product