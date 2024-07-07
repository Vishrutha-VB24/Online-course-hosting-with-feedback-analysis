import {Router} from 'express'
import { loginStudent, logoutStudent, registerStudent, refreshAccessToken } from '../controllers/student.controller.js'
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from '../middlewares/studentauth.middleware.js'


const router = Router()

router.route("/register").post(
    upload.none(),
    registerStudent
)

router.route("/login").post(loginStudent)

//secured routes
router.route("/logout").post(verifyJWT, logoutStudent)
router.route("/student-refresh-token").post(refreshAccessToken)

export default router