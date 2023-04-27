import express from 'express'
import products from './routes/api/products.js'
import carts from './routes/api/carts.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 3000

app.use('/api/products', products)
app.use('/api/carts', carts)

app.listen(PORT, () => {
	console.log(`Escuchando en http://localhost:${PORT}`)
})