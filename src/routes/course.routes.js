import { Router } from "express";
import { verifyJWT as verifyStudentJWT } from "../middlewares/studentauth.middleware.js";
import { verifyJWT as verifyInstructorJWt } from "../middlewares/instructorauth.middleware.js";

const router = Router()

router.route("/register").post(verifyStudentJWT, registerToCourse)
router.route("/create").post(verifyInstructorJWt, createCourse)
router.route("/delete").post(verifyInstructorJWt, deleteCourse)
router.route("/get/:id").get()
router.route("/getAll").get()



export default router