import connectDB from "./db/index.js"
import dotenv from "dotenv"
import { app } from './app.js'

dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Sever is running at port : ${process.env.PORT}`)
        })//server start now till then mondb connected
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    })