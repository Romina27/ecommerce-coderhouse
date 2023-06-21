import { Router } from 'express'
import ProductManager from '../dao/db/productManager.js'
import { __dirname } from '../utils.js'

const products = new ProductManager()

const router = Router()

router.get('/', (req, res) => {
	products.getProducts()
	.then(products => {
		res.render('home', {
			title: 'Productos',
			products
		})
	})
})

export default router