import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// import bodyParser from "body-parser"
import videosRouter from './routes/videos.routes.js'
import instructorRouter from './routes/instructor.routes.js'
import studentRouter from './routes/student.routes.js'

const app = express()

app.use(cors())

 app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({extended:true,limit:"16kb"}))
 app.use(express.static("public"))
 app.use(cookieParser())
//  app.use(bodyParser())
 


 app.use('/api/videos',videosRouter)
 app.use('/api/instructor',instructorRouter)




 
 //routes

 


 //routes declaration
 app.use("/api/v1/student",studentRouter)





export{ app }