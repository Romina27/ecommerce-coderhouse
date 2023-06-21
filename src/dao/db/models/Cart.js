import { Schema, model } from "mongoose"

const cartSchema = new Schema({
    products: [{
        product: String,
        quantity: Number
    }]
})

const Cart = model('Cart', cartSchema)

export default Cart