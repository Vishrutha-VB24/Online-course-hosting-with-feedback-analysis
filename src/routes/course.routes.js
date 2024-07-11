import { Router } from "express";
import { courseRegistration,createCourse,deleteCourse,allCourses } from "../controllers/course.controller.js";
<<<<<<< Updated upstream
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(verifyJWT,courseRegistration)
router.route("/create").post(verifyJWT, createCourse)
router.route("/delete").post(verifyJWT, deleteCourse)
=======


const router = Router()

router.route("/register").post(verifyStudentJWT,courseRegistration)
router.route("/create").post(
    verifyInstructorJWt,
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1
        }, 
        
    ]),
    createCourse)
router.route("/delete").post(verifyInstructorJWt, deleteCourse)
>>>>>>> Stashed changes
router.route("/get/:id").get()
router.route("/all").get(allCourses)







export default router