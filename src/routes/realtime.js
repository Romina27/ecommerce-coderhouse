import { Router } from 'express'
import ProductManager from '../dao/db/productManager.js'
import { __dirname } from '../utils.js'

const products = new ProductManager()

const router = Router()

router.get('/', (req, res) => {
	products.getProducts(undefined, undefined, undefined, undefined, true)
	.then(products => {
		res.render('realtimeProducts', {
			title: 'Realtime',
			products: products.docs
		})
	})
})

export default router