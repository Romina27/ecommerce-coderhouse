import { Router } from "express"
import { __dirname } from "../utils.js"
import ChatManager from "../dao/db/chatManager.js"

const router = Router()

const chat = new ChatManager()

router.get('/', (req, res) => {
    chat.getMessages()
    .then(messages => {
        res.render('chat', {
            title: 'Chat',
            messages
        })
    })
})

export default router