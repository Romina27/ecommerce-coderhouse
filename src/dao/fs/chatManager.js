import fs from 'fs/promises'

class ChatManager {
    constructor(path) {
        this.path = path
    }

    addMessage = async (message) => {
        const messages = await fs.readFile(this.path, 'utf-8')
        .then(data => JSON.parse(data) || [])
        .catch(() => [])

        messages.push(message)

        await fs.writeFile(this.path, JSON.stringify(messages, null, '\t'), 'utf-8')
        
        return 'Mensaje añadido exitosamente'
    }

    getMessages = () => {
        return fs.readFile(this.path, 'utf-8')
        .then(data => JSON.parse(data) || [])
        .catch(() => [])
    }
}

export default ChatManager