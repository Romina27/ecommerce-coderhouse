import { Router } from 'express'
import ProductManager from '../../dao/db/productManager.js'

const products = new ProductManager()

const router = Router()

router.get('/', (req, res) => {
	const { limit } = req.query
	
	products.getProducts(limit)
	.then(products => {
		return res.send(products)
	}).catch(err => {
		return res.status(500).send({ success: false, message: err.message })
	})
})

router.get('/:pid', (req, res) => {
	const { pid } = req.params

	products.getProductById(pid)
	.then(product => {
		return res.send(product)
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

router.post('/', (req, res) => {
	const { body } = req

	products.addProduct(body)
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(400).send({ success: false, message: err.message })
	})
})

router.put('/:pid', (req, res) => {
	const { pid } = req.params
	const { body } = req

	products.updateProduct(pid, body)
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

router.delete('/:pid', (req, res) => {
	const { pid } = req.params

	products.deleteProduct(pid)
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

export default router