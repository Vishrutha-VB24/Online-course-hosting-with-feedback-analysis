import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"
// import { upload } from "../middlewares/multer.middlewares.js"
const generateAccessAndRefreshTokens = async(userId) =>{
     try {
          const student = await User.findById(userId)
          const accessToken = student.generateAccessToken()
          const refreshToken = student.generateRefreshToken()

          student.refreshToken = refreshToken
          await student.save({validateBeforeSave: false})

          return {accessToken,refreshToken}

     } catch (error) {
          throw new ApiError(500,"Something went wrong while generating refresh and access token")
     }
}



const registerStudent = asyncHandler( async (req, res) => {
    const {fullname, email, username, password, phone} = req.body

     if ( [fullname,email, username,password,phone].some((field) => String(field).trim() === "")){
          throw new ApiError(400,"All fields are required")
     }

     const existedStudent = await User.findOne({
          $or:[{username},{email}]
     })

     if(existedStudent){
          throw new ApiError(409, "Student with email or username exists")
     }

     const student = await User.create({
          fullName : fullname,
          userName: username.toLowerCase(),
          email,
          password,
          phone,
          role:"student"
     })

     const createdStudent = await User.findById(student._id).select(
          "-password -studentrefreshToken"
     )

     if(!createdStudent) {
          throw new ApiError(500,"Something went wrong while registering")
     }
     
     return res.status(201).json(
          new  ApiResponse(200,createdStudent, "Student registered successfully")
     )
})

const loginStudent = asyncHandler(async (req, res) => {
     const { username: userName, password} = req.body

     console.log(userName)
     console.log(password)
     if([userName, password].some((field) => field.trim() === "")){
          throw new ApiError(400, "username or password is required")
     }
     const student = await User.findOne({userName})

     if(!student) { throw new ApiError(404, "User does not exist") }

     const isPasswordValid = await student.isPasswordCorrect(password)

     if(!isPasswordValid) { throw new ApiError(401, "Invalid user credentials") }

     const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(student._id)

     const loggedInStudent = await User.findById(student._id).select("-password -studentrefreshToken")

     const options = { httpOnly: true}

     
     res.status(200)
          .cookie("accessToken",accessToken, options)
          .cookie("refreshToken", refreshToken, options)
     res.send(new ApiResponse(200,{ student:loggedInStudent, accessToken, refreshToken},"Student logged in successfully"))
})

const logoutStudent = asyncHandler(async(req, res) => {
     await User.findByIdAndUpdate(
          req.student._id,
          {
               $set: {
                    refreshToken: undefined
               }
          },
          {
               new: true
          }
     )
     
     const options = {
          httpOnly: true,
          secure: true
     }

     return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken", options)
     .json(new ApiResponse(200, {}, "Student logged out"))
})

const refreshAccessToken = asyncHandler(async(req, res) => {
     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

     if (incomingRefreshToken) {
          throw new ApiError(401, "Unauthorized request")
     }

     try {
          const decodedToken = jwt.verify(
               incomingRefreshToken,
               process.env.REFRESH_TOKEN_SECRET
          )
     
          const student = await User.findById(decodedToken?._id)
     
          if (!student) {
               throw new ApiError(401,"Invalid refresh token")
          }
     
          if (incomingRefreshToken !== student?.refreshToken) {
               throw new ApiError(401,"Refresh token is expired or used")
          }
     
          const options = {
               httpOnly: true,
          }
     
         const {accessToken, newRefreshToken} =  await generateAccessAndRefreshTokens(student._id)
     
          return res.status(200).cookie("accessToken",accessToken, options).cookie("refreshToken", newRefreshToken, options)
          .json(
               new ApiResponse(200, {accessToken, refreshToken: newRefreshToken},
                    "Access token refreshed"
               )
          )
     } catch (error) {
          throw new ApiError(401, error?.message || "Invalid refresh token")
     }
})

const getCurrentStudent = asyncHandler(async (req, res)=>{
     
     return res.status(200).json(new ApiResponse(200, req.student, "User fetch succesfully"))
})

const getCookie = asyncHandler(async (req, res) =>{
     console.log(req.cookies)
     res.cookie("mycookie", "hello", {maxAge: 90000000, httpOnly: true})
     res.send("cookie has been sent")
})

export {
    registerStudent,
    loginStudent,
    logoutStudent,
    refreshAccessToken,
    getCurrentStudent,
    getCookie
}