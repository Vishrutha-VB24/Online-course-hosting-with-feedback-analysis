import { Router} from 'express'
import { Courses, CourseVideos, loginInstructor, logoutInstructor, refreshAccessToken, registerInstructor } from '../controllers/instructor.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
const router = Router()


router.route("/register").post(registerInstructor);
router.route("/login").post(loginInstructor);
router.route("/logout").get(verifyJWT, logoutInstructor);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/profile");
router.route('/courses').get( verifyJWT, Courses);
router.route('/course/allvideo/:courseID/').get(verifyJWT, CourseVideos);
export default router 