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

	getProducts = async (limit = 10, page = 1, query, sort, lean = undefined) => {
		return Product.paginate(
			{ ...query, status: true },
			{ limit, page, sort: { createdAt: sort || 'desc' }, lean }
		).then(data => {
			return {
				...data,
				prevLink: data.prevPage ? `/api/products?page=${data.prevPage}` : null,
				nextLink: data.nextPage ? `/api/products?page=${data.nextPage}` : null
			}
		})
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