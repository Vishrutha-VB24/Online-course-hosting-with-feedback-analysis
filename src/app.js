import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const express = require('express')
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
 
 app.use('/api/videos',videosRouter)






export{ app }