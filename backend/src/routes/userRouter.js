import {Router} from "express"
import { register,login, logout ,getuser,userCount} from "../controllers/userController.js"
import  {isAuthorized}  from "../middlewares/auth.js";

const router=Router()

 router.route('/register').post(register)

 router.route('/login').post(login)

 router.route('/logout').get(isAuthorized,logout)


 router.route('/getuser').get(isAuthorized,getuser)

 router.route('/getusercount').get(userCount)
export default router