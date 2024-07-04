import { Router} from 'express'
import { handleList } from '../controllers/instructor.controller.js'
const router = Router()


router.route('/inst_list').post(handleList)




export default router 