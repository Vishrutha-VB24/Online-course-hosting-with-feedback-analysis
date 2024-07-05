import { Router} from 'express'
import { handleList } from '../controllers/videos.controller.js'
const router = Router()


router.route('/list').post(handleList)
router.route('/he').get((req, res)=>{return res.json({a: '455'})})




export default router 