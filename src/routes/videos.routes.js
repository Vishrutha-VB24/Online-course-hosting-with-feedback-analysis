import { Router } from "express";
import { uploadVideo, getVideo } from "../controllers/videos.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const  router = Router()

router.route("/upload").post(
    verifyJWT,
    upload.fields([{name:"video", maxCount:1},{name: "thumbnail", maxCount:1}]),
    uploadVideo
)

router.route("/get/:id").post(
    verifyJWT,
    getVideo
)
router.route("/detele").post()
    







export default router