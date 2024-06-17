import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Job } from "../models/job.model.js";






export const getAlljobs=asyncHandler(async(req,res)=>{
    const jobs=await Job.find({expired:false});

    res.status(200)
       .json(new ApiResponse(200,{jobs},"successfully fetched all available jobs"))

})


export const postJob=asyncHandler(async(req,res,next)=>{
      const {role}=req.user
      if(role!=="Recruiter")
        return next(new ApiError("User is not a Recruiter",400))

       const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,remote,fullTime,company}=req.body;
     
       console.log(title, description,category,country ,city,location ,remote ,fullTime,company)
       if(!title || !description || !category || !country || !city || !location || (remote===undefined) || (fullTime===undefined) || !company)
        return next(new ApiError("Please provide full job details ",400))

       if(!(salaryFrom && salaryTo) && !fixedSalary)
        return next(new ApiError("Please provide salary details (fixed salary or ranged salary)",400))

       if(salaryFrom && salaryTo && fixedSalary)
        return next(new ApiError("Cannot enter fixed salary and ranged salary together"))


        const postedBy=req.user._id
        const job=await Job.create({
            title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy,remote,fullTime,company
        })

        res.status(200)
           .json(new ApiResponse(200,job,"job posted successfully"))
})


export const getMyJobs=asyncHandler(async(req,res,next)=>{
       const {role}=req.user
      
       if(role!=="Recruiter")
        return next(new ApiError("Job Seeker is not allow to access this resources",400))

       const jobs=await Job.find({postedBy:req.user._id})

       res.status(200)
          .json(new ApiResponse(200,{jobs},"all jobs of user fetched successfully"))

})


export const editPost=asyncHandler(async(req,res,next)=>{
    console.log("welcome to edit post session")
    const {role}=req.user;
    if(role!=="Recruiter")
        return next(new ApiError("Job Seeker is not allow to access this resources",400))

   const {id}=req.params;

    let job=await Job.findById(id)
   
    if(!job)
        return next(new ApiError("OOPS job not found",404))

     console.log(job.postedBy,req.user._id)
  
     if(String(job.postedBy)!=String(req.user._id))
       return next(new ApiError("You only can update your posts"))

    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })

    res.status(200)
       .json(new ApiResponse(200,job,"job updated successfully"))
})


export const deletePost=asyncHandler(async(req,res,next)=>{
    
    const {role}=req.user;
    if(role!=="Recruiter")
        return next(new ApiError("Job Seeker is not allow to access this resources",400))

   const {id}=req.params;

    let job=await Job.findById(id)
    if(!job)
        return next(new ApiError("OOPS job not found",404))

  
     if(String(job.postedBy)!=String(req.user._id))
       return next(new ApiError("You only can delete your posts"))

       job=await Job.findByIdAndDelete(id);

      res.status(200)
         .json(new ApiResponse(200,job,"job deleted successfully"))
})

export const getJobDetails=asyncHandler(async(req,res,next)=>{
      const {id}=req.params

      let job=await Job.findById(id)
      if(!job)
          return next(new ApiError("OOPS job not found",404))

      res.status(200)
         .json(new ApiResponse(200,{job},"job details fetched successfully"))
  
})