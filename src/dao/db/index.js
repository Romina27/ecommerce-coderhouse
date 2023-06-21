import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Base de datos conectada')
    }).catch(err => {
        console.error(err.message)
    })
}