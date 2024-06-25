import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Sever is running at port : $ {process.env.PORT}`)
    })//server start now till then mondb connected
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})