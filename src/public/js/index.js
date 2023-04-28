const socket = io()

const form = document.querySelector('form')
const products = document.querySelector('.products')

form.addEventListener('submit', e => {
	e.preventDefault()

	const { title, code, price, stock, category, description } = e.currentTarget

	const product = {
		title: title.value,
		code: code.value,
		price: price.value,
		stock: stock.value,
		category: category.value,
		description: description.value
	}

	socket.emit('add product', product)
})

socket.on('new product', product => {
	products.insertAdjacentHTML('beforeend', `
		<div class="product">
			<div class="title">
				${product.title}
			</div>
			<div class="price">
				$${product.price}
			</div>
		</div>
	`)
})

socket.on('error', err => {
	console.error(err)
})