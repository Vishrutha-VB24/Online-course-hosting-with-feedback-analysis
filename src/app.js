import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// import bodyParser from "body-parser"
import videosRouter from './routes/videos.routes.js'

const app = express()

app.use(cors({
   origin:process.env.CORS_ORIGIN,
   Credential:true
 }))

 app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({extended:true,limit:"16kb"}))
 app.use(express.static("public"))
 app.use(cookieParser())
//  app.use(bodyParser())
 
 app.use('/api/videos',videosRouter)


 
 //routes

 import studentRouter from './routes/student.routes.js'


 //routes declaration
 app.use("/api/v1/student",studentRouter)





export{ app }