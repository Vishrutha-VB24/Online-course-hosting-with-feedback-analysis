import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import videosRouter from './routes/videos.routes.js'
import instructorRouter from './routes/instructor.routes.js'
import studentRouter from './routes/student.routes.js'

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
    optionsSuccessStatus: 200, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/videos',videosRouter)
app.use('/api/instructor',instructorRouter)
app.use("/api/student",studentRouter)

export{ app }