import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Instructor } from "../models/instructor.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async(instructorID) => {
    try {
        const user = await Instructor.findById(instructorId)
        const accessToken = instructor.generateAccessToken
        const refreshToken =  instructor.generateRefreshToken

        instructor.refreshToken = refreshToken
        await instructor.save({validateBeforeSave: false})

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerInstructor = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    const {name, username, email, password, phoneNumber, Bio} = req.body
    console.log("email: ", email);

    if([name, username, email, password, phoneNumber, Bio].some((field) =>
    field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required")
    }

    const existedInstructor = await Instructor.findOne({
        $or: [{ username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "Instructor with email or username already exists")
    }
    // console.log(req.files);

    const user = await Instructor.create({
        name,
        email,
        password,
        username: username.toLowerCase(),
        phoneNumber,
        Bio
    })

    const createInstructor = await Instructor.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdInstructor) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createInstructor, "Instructor registered successfully")
    )

})

const loginInstructor = asyncHandler(async (req, res) => {

    const {email, username, password} = req.body
    if(!username || !email) {
        throw new ApiError(400, "username or password is required")

    }

    const instructor = await Instructor.findOne({
        $or: [{username}, {email}]
    })

    if(!instructor){
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordValid = await instructor.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Inavid instructor credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(instructor._id)

    const loggedInInstructor = await Instructor.findById(instructorId).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                instructor: loggedInInstructor, accessToken, refreshToken

            },
            "Instructor logged In Successfully"
        )
    )

})

const logoutInstructor = asyncHandler(async(req, res) => {
    await Instructor.findByIdAndUpdate(
        req.instructor._id,
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

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Instructor logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const instructor = await Instructor.findById(decodedToken?._id)
    
        if (!instructor) {
            throw new ApiError(401, "Invalid refresh token")
        }
        if(incomingRefreshToken !== instructor?.refreshToken) {
            throw new ApiError(401,"Refresh token is expired or used")
    
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        await generateAccessAndRefreshTokens(instructor._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accesssToken, refreshToken: newRefreshtoken},
                "Access token refreshed"
            )
        )
    
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const getCurrentInstructor = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(200, req.user, "current user fetched successfully")

})




export {
    registerInstructor,
    loginInstructor,
    logoutInstructor,
    refreshAccessToken
}