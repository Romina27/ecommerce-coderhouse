import { Schema, model } from "mongoose"

const chatSchema = new Schema({
    uid: String,
    name: String,
    message: String
})

const Chat = model('Chat', chatSchema)

export default Chat