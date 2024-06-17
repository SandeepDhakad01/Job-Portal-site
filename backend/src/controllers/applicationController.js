import { Application } from "../models/application.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import {Job} from "../models/job.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";




export const applyForJob=asyncHandler(async(req,res,next)=>{

    console.log("welcome to applyForJob section")
    const {role}=req.user

    if(role!=="Job Seeker")
        return next(new ApiError("Only Job Seeker are allow to apply "),400)

    let {jobID}=req.params

  let job;
    try{
         job=await Job.findById(jobID)  
    }
    catch(err){
        return next(new ApiError("Please provide a valid id : this id not follow the mongoose object id critria",404))
    }
 
    if(!job)
    return next(new ApiError(" OOPS NO such job found",404))

    if(job.expired)
        return next(new ApiError("This Job is expired..."),400)
  
     const isAlreadyApplied=await Application.findOne({applicantID:req.user._id,jobID})
    

     if(isAlreadyApplied)  
        return next(new ApiError("You already apply for this job.."))
   
     
     const resume=req.file?.['path']
     const {coverLetter}=req.body
      
   
     const cloudinaryResponse= await uploadToCloudinary(resume);

     if(!coverLetter || !resume)
        return next(new ApiError("resume or coverLetter is missing ...",400))

        
      const application=await Application.create({
         applicantID:req.user._id,
         jobID,
         coverLetter,
         resume:cloudinaryResponse.url
      })
      
      res.status(200)
         .json(new ApiResponse(200,{application},"applied for job successfully"))
})







export const getAllApplications=asyncHandler(async(req,res,next)=>{
    const {role}=req.user;

    if(role!=="Recruiter")
        return next(new ApiError("Only Recruiters are allow to access this resource",400))

      const id=req.user._id;

      const postId=req.params.postId
      

      let applications=await Application.find({jobID:postId})


      // map ke under callback me async ka use ker rahe he to promise return karega .... solution use => await Promise.all
      applications=await Promise.all(applications.map(async(app)=>{
          const user=await User.findById(app.applicantID);
               
          return {application:app,user:user};
      }))
       
      res.status(200)
   .json(new ApiResponse(200,applications,"All application for this post is fetched successfully"))
})



export const getMyApplications=asyncHandler(async(req,res,next)=>{
   const {role}=req.user
   
   if(role!=="Job Seeker")
    return next(new ApiError("Only job seeker are allow to access this resource",400))

    let applications=await Application.find({applicantID:req.user._id})

     applications= await Promise.all(applications.map(async(app)=>{    // map function me jab bhi async callback pass karege to promise return hoga to dhyan rakhe .....
        const user=await User.findById(app.applicantID)
        const job=await Job.findById(app.jobID)

         const result=
         {
            ...user?.toObject(),
            ...job?.toObject(),
            ...app?.toObject(),
              _id:app._id
        }
        
         return result;
     }     
     )
    )


    res.status(200)
       .json(new ApiResponse(200,{applications},"all applications of current user is fetched successfully"))
})



export const deleteApplication=asyncHandler(async(req,res,next)=>{
   const {role}=req.user;
   if(role!="Job Seeker")
      return next(new ApiError("Recruiter can not access this resource",400))

    const appId=req.params.id;
     
    const application = await Application.findById(appId);
 
     if(!application)
      return next (new ApiError("OOPs no such application exist..",404))
     
     
     if(application.applicantID.toString()!==req.user._id.toString())
      return next(new ApiError("You can only delete your applications",400))

       const dltapp=await Application.findByIdAndDelete(appId);

       res.status(200)
          .json(new ApiResponse(200,{dltapp},"your application deleted successfully.."))
})