import { Server } from 'socket.io'
import ProductManager from './dao/fs/productManager.js'
import { __dirname } from './utils.js'
import ChatManager from './dao/db/chatManager.js'

const products = new ProductManager(__dirname + '/public/products.json')
const chat = new ChatManager()

const io = (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: '*'
		}
	})

	io.on('connection', socket => {
		console.log('Usuario conectado:', socket.id)

		socket.on('add product', product => {
			products.addProduct(product)
			.then(() => {
				io.emit('new product', product)
			}).catch(err => {
				io.emit('error', err.message)
			})
		})

		socket.on('add message', message => {
			chat.addMessage(message)
			.then(() => {
				io.emit('new message', message)
			}).catch(err => {
				io.emit('error', err)
			})
		})
	})
}

export default io