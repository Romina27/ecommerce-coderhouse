import { Router } from 'express'
import CartManager from '../../dao/db/cartManager.js'

const carts = new CartManager()

const router = Router()

router.post('/', (req, res) => {
	return carts.addCart()
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(500).send({ success: false, message: err.message })
	})
})

router.get('/:cid', (req, res) => {
	const { cid } = req.params

	return carts.getCartById(cid)
	.then(cart => {
		return res.send(cart)
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

router.put('/:cid', (req, res) => {
	const { cid } = req.params
	const { products } = req.body

	return carts.updateCart(cid, products)
})

router.post('/:cid/product/:pid', (req, res) => {
	const { cid, pid } = req.params

	return carts.addProduct(cid, pid)
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

router.delete('/:cid/product/:pid', (req, res) => {
	const { cid, pid } = req.params

	return carts.deleteProduct(cid, pid)
	.then(data => {
		return res.send({ success: true, message: data })
	})
})

export default router