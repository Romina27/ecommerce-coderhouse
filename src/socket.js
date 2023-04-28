import { Server } from 'socket.io'
import ProductManager from './productManager.js'
import { __dirname } from './utils.js'

const products = new ProductManager(__dirname + '/public/products.json')

const io = (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: '*'
		}
	})

	io.on('connection', socket => {
		console.log('Usuario conectado')

		socket.on('add product', product => {
			products.addProduct(product)
			.then(() => {
				io.emit('new product', product)
			}).catch(err => {
				io.emit('error', err.message)
			})
		})
	})
}

export default io