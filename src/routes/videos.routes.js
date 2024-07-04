import { Router} from 'express'
import { handleList } from '../controllers/instructor.controller.js'
const router = Router()


router.route('/list').post(handleList)




export default router 