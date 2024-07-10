import { Router } from "express";
import { courseRegistration,createCourse,deleteCourse,allCourses } from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js"

const router = Router()

  
router.route("/register").post(verifyJWT,courseRegistration)
router.route("/delete").post(verifyJWT, deleteCourse)
router.route("/register").post(verifyJWT,courseRegistration)
router.route("/create").post(
    verifyJWT,
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1
        }, 
    ]),
    createCourse
)

router.route("/get/:id").get()
router.route("/all").get(allCourses)







export default router