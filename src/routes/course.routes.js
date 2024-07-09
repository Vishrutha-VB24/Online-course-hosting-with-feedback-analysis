import { Router } from "express";
import { verifyJWT as verifyStudentJWT } from "../middlewares/studentauth.middleware.js";
import { verifyJWT as verifyInstructorJWt } from "../middlewares/instructorauth.middleware.js";
import { courseRegistration,createCourse,deleteCourse,allCourses } from "../controllers/course.controller.js";
const router = Router()

router.route("/register").post(verifyStudentJWT,courseRegistration)
router.route("/create").post(verifyInstructorJWt, createCourse)
router.route("/delete").post(verifyInstructorJWt, deleteCourse)
router.route("/get/:id").get()
router.route("/all").get(allCourses)



export default router