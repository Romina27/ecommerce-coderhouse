import * as fs from 'fs/promises'

class ProductManager {
	constructor(path) {
		this.path = path
	}

	addProduct = async ({ code, title, price, thumbnails, description, stock, category }) => {
		const products = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		const exists = products.find(product => product.code == code)

		if (!exists) {
			const newProduct = {
				id: products.length + 1,
				code,
				title,
				price,
				thumbnails: thumbnails || 'Sin imagen',
				description,
				stock,
				category,
				status: true
			}

			products.push(newProduct)

			await fs.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8')

			return 'Producto añadido exitosamente'
		}

		throw new Error('Este producto ya existe!')
	}

	getProducts = async (limit) => {
		const products = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		if (limit) {
			return products.filter((product, index) => product.status && index + 1 <= limit)
		}
			
		return products.filter(product => product.status)
	}

	getProductById = async id => {
		const products = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		const findProduct = products.find(product => product.id == id && product.status)

		if (findProduct) {
			return findProduct
		}

		throw new Error('Producto no encontrado')
	}

	updateProduct = async (id, { code, title, price, thumbnails, description, stock, category }) => {
		const products = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		const findProduct = products.find(product => product.id == id && product.status)

		if (!findProduct) {
			throw new Error('Producto no encontrado')
		}

		const updatedProduct = {
			id,
			code: code || findProduct.code,
			title: title || findProduct.title,
			price: price || findProduct.price,
			thumbnails: thumbnails || findProduct.thumbnails,
			description: description || findProduct.description,
			stock: stock || findProduct.stock,
			category: category || findProduct.category,
			status: true
		}

		const productIndex = products.findIndex(product => product.id == id)
		products.splice(productIndex, 1, updatedProduct)

		await fs.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8')

		return 'Producto actualizado exitosamente'
	}

	deleteProduct = async id => {
		const products = await fs.readFile(this.path, 'utf-8')
		.then(data => JSON.parse(data) || [])
		.catch(() => [])

		const findProduct = products.find(product => product.id == id && product.status)

		if (!findProduct) {
			throw new Error('Producto no encontrado')
		}

		const productIndex = products.findIndex(product => product.id == id)
		products[productIndex].status = false

		await fs.writeFile(this.path, JSON.stringify(products, null, '\t'), 'utf-8')

		return 'Producto eliminado exitosamente'
	}
}

export default ProductManager