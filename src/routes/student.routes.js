import {Router} from 'express'
import { loginStudent, logoutStudent, registerStudent, refreshAccessToken } from '../controllers/student.controller.js'
// import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from '../middlewares/studentauth.middleware.js'


const router = Router()

router.route("/registerStudent").post(
    // upload.fields([

    // ]),
    registerStudent
)
// router.route("/loginStudent").post(loginStudent)

router.route("/loginStudent").post(loginStudent)

//secured routes
router.route("/logoutStudent").post(verifyJWT, logoutStudent)
router.route("/student-refresh-token").post(refreshAccessToken)

export default router