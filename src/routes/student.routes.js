import {Router} from 'express'
import {getCurrentStudent, loginStudent, logoutStudent, registerStudent, refreshAccessToken } from '../controllers/student.controller.js'
import {upload} from "../middlewares/multer.middlewares.js"
import { getCookie } from '../controllers/student.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'



const router = Router()

router.route("/register").post(
    upload.none(),
    registerStudent
)

router.route("/login").post(loginStudent)

//secured routes
router.route("/logout").post(verifyJWT, logoutStudent)
router.route("/student-refresh-token").post(refreshAccessToken)
router.route("/current").get(verifyJWT, getCurrentStudent)
router.route("/cookie").get(getCookie)


export default router