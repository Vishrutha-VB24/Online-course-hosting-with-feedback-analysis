import { Router } from "express";
import { courseRegistration,createCourse,deleteCourse,allCourses } from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(verifyJWT,courseRegistration)
router.route("/create").post(verifyJWT, createCourse)
router.route("/delete").post(verifyJWT, deleteCourse)
router.route("/get/:id").get()
router.route("/all").get(allCourses)



export default router