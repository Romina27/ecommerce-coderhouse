import { Router } from 'express'
import ProductManager from '../productManager.js'
import { __dirname } from '../utils.js'

const products = new ProductManager(__dirname + '/public/products.json')

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