import * as fs from 'fs/promises'
import ProductManager from './productManager.js'

const products = new ProductManager('src/public/products.json')

class CartManager {
	constructor(path) {
		this.path = path
	}

	addCart = async () => {
		const carts = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		carts.push({
			id: carts.length + 1,
			products: []
		})

		await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8')

		return 'Carrito añadido exitosamente'
	}

	getCartById = async id => {
		const carts = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		const findCart = carts.find(cart => cart.id == id)

		if (findCart) {
			return findCart
		}

		throw new Error('Carrito no encontrado')
	}

	addProduct = async (cid, pid) => {
		const carts = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		const findCart = carts.find(cart => cart.id == cid)

		if (!findCart) throw new Error('Carrito no encontrado')

		await products.getProductById(pid)

		const findProduct = findCart.products.find(product => product.product == pid)

		if (findProduct) {
			findCart.products = findCart.products.map(product => {
				if (product.product == pid) {
					return {
						...product,
						quantity: product.quantity + 1
					}
				} else {
					return product
				}
			})
		} else {
			findCart.products.push({
				product: pid,
				quantity: 1
			})
		}

		const cartIndex = carts.findIndex(cart => cart.id == cid)
		carts.splice(cartIndex, 1, findCart)

		await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8')

		return 'Producto añadido correctamente'
	}
}

export default CartManager