    import { asyncHandler } from "../utils/AsyncHandler.js";
    import {ApiError} from "../utils/ApiErrors.js"
    import {User} from "../models/user.model.js"
    import jwt from "jsonwebtoken"
  
export const isAuthorized = asyncHandler(async(req,res,next)=>{
    const {accessToken}=req.cookies;
     console.log("welcome to auth secction...")
    if(!accessToken){
      return next(new ApiError("User is not authorized",400));
    }

   const decoded=jwt.verify(accessToken,process.env.JWT_SECRET_KEY);
    
   const user=await User.findById(decoded.id);
      
   if(!user) 
    return next(new ApiError("invalid token",400))

    req.user=user;
   
    next();
})