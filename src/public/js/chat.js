const socket = io()
let name = JSON.parse(localStorage.getItem('name')) || undefined
const uid = JSON.parse(localStorage.getItem('uid')) || (localStorage.setItem('uid', Date.now()), JSON.parse(localStorage.getItem('uid')))
const chatContainer = document.querySelector('.chatWrapper')
const chat = document.querySelector('.chat')
const allMsgs = document.querySelectorAll('.message')
const sendForm = document.querySelector('form.sendMessage')

const checkMsgs = () => {
    allMsgs.forEach(msg => {
        const id = msg.id

        if (id == uid) {
            msg.classList.add('current')
        }
    })
}

if (!name) {
    chatContainer.insertAdjacentHTML('afterbegin', `
        <div class="nameOverlay">
            <h2>Nombre de usuario</h2>
            <form class="username">
                <input type="text" name="username" required />
                <button>Confirmar</button>
            </form>
        </div>
    `)

    const userForm = document.querySelector('form.username')
    const nameOverlay = document.querySelector('.nameOverlay')

    userForm.addEventListener('submit', e => {
        e.preventDefault()
        
        const { username } = e.currentTarget

        localStorage.setItem('name', JSON.stringify(username.value))
        name = username.value
        nameOverlay.remove()

        checkMsgs()
    })
} else {
    checkMsgs(1)
}

sendForm.addEventListener('submit', e => {
    e.preventDefault()
    
    const { message } = e.currentTarget

    const newMessage = {
        uid,
        name,
        message: message.value
    }

    socket.emit('add message', newMessage)
    message.value = ''
})

socket.on('new message', message => {
    chat.insertAdjacentHTML('beforeend', `
        <div class="message ${message.uid == uid ? 'current' : ''}" id=${message.uid}>
            <div class="name">
                ${message.name}
            </div>
            <div class="content">
                ${message.message}
            </div>
        </div>
    `)
})