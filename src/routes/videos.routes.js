import { Router } from "express";
import { verifyJWT as verifyInstructorJWT } from "../middlewares/instructorauth.middleware.js";
import { verifyJWT as verifyStudentJWT} from "../middlewares/studentauth.middleware.js";
import { uploadVideo, getVideo } from "../controllers/videos.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
const  router = Router()

router.route("/upload").post(
    verifyInstructorJWT,
    upload.fields([{
    name:"video",
    maxCount:1
    },{
        name: "thumbnail",
        maxCount:1
    }]),
    uploadVideo
)

router.route("/get/:id").post(
    verifyStudentJWT,
    getVideo
)
router.route("/detele").post()
    







export default router