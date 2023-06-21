import Chat from './models/Chat.js'

class ChatManager {
    addMessage = (message) => {
        return Chat.create(message)
    }

    getMessages = () => {
        return Chat.find().lean()
    }
}

export default ChatManager