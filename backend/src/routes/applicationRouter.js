import {Router} from "express"
import { isAuthorized } from "../middlewares/auth.js"
import { getAllApplications,applyForJob,getMyApplications,deleteApplication } from "../controllers/applicationController.js"
import { upload } from "../middlewares/multer.js"







const router=Router()



router.route('/apply/:jobID').post(isAuthorized,
    upload.single(
        "resume"
    ),
    applyForJob)

router.route('/recieved/:postId').get(isAuthorized,getAllApplications)

router.route('/myallapplications').get(isAuthorized,getMyApplications)

router.route('/delete/:id').delete(isAuthorized,deleteApplication);

export default router