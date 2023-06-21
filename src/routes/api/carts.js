import { Router } from 'express'
import CartManager from '../../dao/db/cartManager.js'

const carts = new CartManager()

const router = Router()

router.post('/', (req, res) => {
	carts.addCart()
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(500).send({ success: false, message: err.message })
	})
})

router.get('/:cid', (req, res) => {
	const { cid } = req.params

	carts.getCartById(cid)
	.then(cart => {
		return res.send(cart)
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

router.post('/:cid/product/:pid', (req, res) => {
	const { cid, pid } = req.params

	carts.addProduct(cid, pid)
	.then(data => {
		return res.send({ success: true, message: data })
	}).catch(err => {
		return res.status(404).send({ success: false, message: err.message })
	})
})

export default router