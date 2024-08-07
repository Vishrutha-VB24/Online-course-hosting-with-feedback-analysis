import { Router } from "express";
import { uploadVideo, getVideo, deleteVideo } from "../controllers/videos.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const  router = Router()

router.route("/upload/:courseID").post(
    verifyJWT,
    upload.fields([{name:"videoFile", maxCount:1},{name: "thumbnail", maxCount:1}]),
    uploadVideo
)

router.route("/get/:id").get(
    verifyJWT,
    getVideo
)
router.route("/delete/:id").get(verifyJWT, deleteVideo)
    







export default router