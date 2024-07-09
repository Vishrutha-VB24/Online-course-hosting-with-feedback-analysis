import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken =  jwt.verify(token, process.env.ACCESSTOKEN_TOKEN_SECRET)
    
        const instructor = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!instructor) {
            throw new ApiError(401, "Invalid Access Token" )
        }
    
        req.instructor = instructor;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
        
    }

})