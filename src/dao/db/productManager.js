import Product from './models/Product.js'

class ProductManager {
    addProduct = async ({ code, title, price, thumbnails, description, stock, category }) => {
		const exists = await Product.findOne({ code })

		if (!exists) {
			const newProduct = {
				code,
				title,
				price,
				thumbnails: thumbnails || 'Sin imagen',
				description,
				stock,
				category,
				status: true
			}

			return Product.create(newProduct)
            .then(() => 'Producto añadido exitosamente')
		}

		throw new Error('Este producto ya existe!')
	}

	getProducts = async (limit) => {
		if (limit) {
			return Product.find({ status: true }).limit(limit)
		}
			
		return Product.find({ status: true })
	}

	getProductById = async id => {
        return Product.findOne({ _id: id, status: true })
        .then(doc => {
            if (!doc) throw new Error('Producto no encontrado')

            return doc
        })
	}

	updateProduct = async (id, newProduct) => {
		return Product.findByIdAndUpdate(id, newProduct, { new: true })
        .then(doc => {
            if (!doc) throw new Error('Producto no encontrado')

            return 'Producto actualizado exitosamente'
        })
	}

	deleteProduct = async id => {
		return Product.findByIdAndUpdate(id, { status: false }, { new: true })
        .then(doc => {
            if (!doc) throw new Error('Producto no encontrado')

            return 'Producto eliminado exitosamente'
        })
	}
}

export default ProductManager