import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Student } from "../models/student.models.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async(userId) =>
{
     try {
          const student = await Student.findById(userId)
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
    const {fullName, email, userName, password, phone} = req.body
    console.log(req.body)
     

//     console.log(req)
    console.log("email:",email)


   if (
    [fullName,email, userName,password,phone].some((field) =>
    String(field).trim() === "")
   ){
    throw new ApiError(400,"All fields are required")
   }

   const existedStudent = await Student.findOne({
        $or:[{userName},{email}]
   })

   if(existedStudent){
        throw new ApiError(409, "Student with email or username exists")
   }

   const student = await Student.create({
          fullName,
          userName:userName.toLowerCase(),
          email,
          password,
          phone,
   })

   const createdStudent = await Student.findById(student._id).select(
     "-password -refreshToken"
   )

   if(!createdStudent) {
     throw new ApiError(500,"Something went wrong while registering")
   }

   return res.status(201).json(
     new  ApiResponse(200,createdStudent, "Student registered successfully")
   )
})

const loginStudent = asyncHandler(async (req, res) => {

     const {email, userName, password} = req.body

     if(!(userName || email)) {
          throw new ApiError(400, "username or password is required")
     }

     const student = await Student.findOne({
          $or: [{userName},{email}]
     })

     if(!student) {
          throw new ApiError(404, "User does not exist")
     }

     const isPasswordValid = await student.isPasswordCorrect(password)

     
     if(!isPasswordValid) {
          throw new ApiError(401, "Invalid user credentials")
     }

     const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(student._id)

     const loggedInStudent = await Student.findById(student._id).select("-password -refreshToken")

     const options = {
          httpOnly: true,
          secure: true
     }

     return res.status(200).cookie("accessToken",accessToken, options).cookie("refreshToken", refreshToken, options).json(
          new ApiResponse(
               200,
               {
                    student:loggedInStudent, accessToken, refreshToken
               },
               "Student logged in successfully"
          )
     )
})

const logoutStudent = asyncHandler(async(req, res) => {
     await Student.findByIdAndUpdate(
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
     
          const student = await Student.findById(decodedToken?._id)
     
          if (!student) {
               throw new ApiError(401,"Invalid refresh token")
          }
     
          if (incomingRefreshToken !== student?.refreshToken) {
               throw new ApiError(401,"Refresh token is expired or used")
          }
     
          const options = {
               httpOnly: true,
               secure: true
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

export {
    registerStudent,
    loginStudent,
    logoutStudent,
    refreshAccessToken,
}