import {Router} from "express"
import { deletePost, editPost, getAlljobs ,getMyJobs,postJob,getJobDetails} from "../controllers/jobController.js"
import { isAuthorized } from "../middlewares/auth.js"





const router=Router()

router.route('/getall').get(getAlljobs)

router.route('/post').post(isAuthorized,postJob)

// another syntax
router.get('/getmyjobs',isAuthorized,getMyJobs)

router.route('/update/:id').put(isAuthorized,editPost)

router.route('/delete/:id').delete(isAuthorized,deletePost)

router.route('/:id').get(isAuthorized,getJobDetails)

export default router 