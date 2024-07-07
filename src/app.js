import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import videosRouter from './routes/videos.routes.js'
import instructorRouter from './routes/instructor.routes.js'
import studentRouter from './routes/student.routes.js'

const app = express()

app.use(cors())

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/videos',videosRouter)
app.use('/api/instructor',instructorRouter)
app.use("/api/student",studentRouter)

export{ app }