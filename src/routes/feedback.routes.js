import { Router } from "express";
//import { verifyJWT } from "../middlewares/auth.middleware.js";
import { newfeedback } from "../controllers/feedback.controller.js";

const router = Router()






router.route("/new/:courseID").post(newfeedback)





export default router