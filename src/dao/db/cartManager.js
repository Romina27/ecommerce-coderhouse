import { Types } from "mongoose"
import Cart from "./models/Cart.js"
import ProductManager from "./productManager.js"

const products = new ProductManager()

class CartManager {
    addCart = async () => {
		return Cart.create({ products: [] })
        .then(doc => {
            return doc.id
        })
	}

	getCartById = async id => {
		return Cart.findById(id)
        .then(doc => {
            if (!doc) throw new Error('Carrito no encontrado')

            return doc
        })
	}

    updateCart = (cid, products) => {
        
    }

	addProduct = async (cid, pid, quantity = undefined) => {
		await products.getProductById(pid)

        return Cart.findById(cid)
        .then(data => {
            if (!data) throw new Error('Carrito no encontrado')

            return Cart.findOne({ _id: cid, 'products.product': pid })
            .then(doc => {
                if (!doc) {
                    const newProducts = [...data.products, { product: pid, quantity: quantity || 1 }]

                    return Cart.findByIdAndUpdate(cid, { products: newProducts }, { new: true })
                    .then(() => 'Producto añadido exitosamente')
                }

                return Cart.findOneAndUpdate(
                    { _id: cid },
                    { $inc: { 'products.$[p].quantity': quantity || 1 } },
                    { arrayFilters: [{ 'p.product': new Types.ObjectId(pid) }], new: true }
                ).then(() => 'Producto añadido exitosamente')
            })
        })
	}

    deleteProduct = async (cid, pid) => {
        await products.getProductById(pid)

        return Cart.updateOne(
            { _id: cid },
            { $pull: { 'products': { 'product': pid } } },
            { new: true }
        ).then(() => 'Producto eliminado exitosamente')
    }
}

export default CartManager