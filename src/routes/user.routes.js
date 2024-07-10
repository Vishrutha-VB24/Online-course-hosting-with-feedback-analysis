import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router()

router.route("/current").get(verifyJWT, (req, res)=>{
    if(req.instructor){
        return res.status(200).json(200, new ApiResponse(200, req.instructor, "Succesfully fetched instructor"))
    }
    if(req.student){
        return res.status(200).json(200, new ApiResponse(200, req.student, "Succesfully fetched student"))
    }
    return res.json(404, "User not found");
})

export default router