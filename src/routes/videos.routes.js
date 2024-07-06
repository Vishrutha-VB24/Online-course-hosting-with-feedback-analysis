import { Router} from 'express'
import { handleList } from '../controllers/videos.controller.js'
const router = Router()


router.route('/list').post(handleList)




export default router 