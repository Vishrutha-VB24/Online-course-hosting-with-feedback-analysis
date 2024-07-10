import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import videosRouter from './routes/videos.routes.js'
import instructorRouter from './routes/instructor.routes.js'
import studentRouter from './routes/student.routes.js'
import courseRouter from './routes/course.routes.js'
import userRouter from './routes/user.routes.js'
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));
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
app.use("/api/course",courseRouter)
app.use('/api/videos',videosRouter)
app.use('/api/instructor',instructorRouter)
app.use("/api/student",studentRouter)
app.use("/api/user", userRouter)


export{ app }