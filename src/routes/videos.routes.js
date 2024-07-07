import { Router } from "express";
import { verifyJWT as verifyInstructorJWT } from "../middlewares/Instructorauth.middleware";
import { verifyJWT as verifyStudentJWT} from "../middlewares/studentauth.middleware";
import { uploadVideo } from "../controllers/videos.controller";
import { upload } from "../middlewares/multer.middlewares";
const  router = Router()
router.route("/upload").post(
    verifyInstructorJWT,
    upload.fields[{
    name:"video",
    maxCount:1
    },{
        name:thumbnail,
        maxCount:1
    }],
    uploadVideo
)

router.route("/get/:id").post(
    verifyStudentJWT,
    getVideo
)
router.route("/detele").post()
    







export default router