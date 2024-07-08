import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
import e from "cors";

export const verifyJWT  = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        
        if(user.role == "student"){
            req.student = user;
        }
        else if(user.role == "instructor"){
            req.instructor = user;
        }
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }

}) 