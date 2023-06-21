import express from 'express'
import http from 'http'
import io from './socket.js'
import { engine } from 'express-handlebars'
import home from './routes/index.js'
import realtime from './routes/realtime.js'
import chat from './routes/chat.js'
import products from './routes/api/products.js'
import carts from './routes/api/carts.js'
import { __dirname } from './utils.js'
import dotenv from 'dotenv'
import { dbConnect } from './dao/db/index.js'

dotenv.config()

const app = express()
const server = http.createServer(app)

io(server)
dbConnect()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(__dirname + '/public'))

const PORT = 3000

app.use('/', home)
app.use('/realtimeproducts', realtime)
app.use('/chat', chat)
app.use('/api/products', products)
app.use('/api/carts', carts)

server.listen(PORT, () => {
	console.log(`Escuchando en http://localhost:${PORT}`)
})