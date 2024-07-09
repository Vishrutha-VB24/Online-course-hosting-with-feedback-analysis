import { Router} from 'express'
import { loginInstructor, logoutInstructor,getCurrentInstructor, refreshAccessToken, registerInstructor } from '../controllers/instructor.controller.js'
// import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from '../middlewares/auth.middleware.js'
const router = Router()


router.route("/register").post(
    registerInstructor
)

router.route("/login").post(loginInstructor)
router.route("/current").get(getCurrentInstructor)
router.route("/logout").get(verifyJWT, logoutInstructor)
router.route("/refresh-token").post(refreshAccessToken)


export default router 