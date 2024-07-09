import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";


export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.studentAccessToken || req.header("Authorization")?.replace("Bearer","")
        if(!token) {
            next()
            return
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const student = await User.findById(decodedToken?._id).select("-password -studentRefreshToken")
    
        if(!student) {
            throw new ApiError(401, "Invalid access token")
        }
    
        req.student = student;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})