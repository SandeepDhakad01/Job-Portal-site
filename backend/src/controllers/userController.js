import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from 'axios'

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function verifyEmail(email) {
  try {
    const requestUrl=`https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}`;
    console.log("requestUrl : ",requestUrl)
    
    const response = await axios.get(requestUrl);
    
    console.log("responce => ",response)
    return response.data.status==='valid'; 
  } catch (error) {
    console.error('Error verifying email:', error);
    return false;
  }
}

export const register = asyncHandler(async (req, res, next) => {
  console.log("register ke liye request aai h ")
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password)
    return next(new ApiError("Please provide all the fields.."));
      
     if(!isValidEmail(email))
      return next(new ApiError("Please provide a valid email address"))

    //  const isValid = await verifyEmail(email);
    //  if (!isValid) {
    //   console.log("isvalid : ",isValid)
    //    return next(new ApiError('Invalid email address , does not exist' ));
    //  }


  const isExist = await User.findOne({ email });

  if (isExist) {
    return next(new ApiError('Email already exists!',500))
  }


  
  try {
    const user = await User.create({
      name,
      email,
      phone,
      role,
      password
    })
  
    user.password = undefined
   
  
    const accessToken=user.generateJWTToken();
    const options={
      expires: new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
      httpOnly:true,
      secure:true,
      sameSite: 'None' // Allow cross-site cookies
    }
     
   
    res.status(200)
    .cookie("accessToken",accessToken,options)
    .json(
      new ApiResponse(200, { user }, "User registered!")
    )
  }
  catch (err) {
    // next(new ApiError(`Problem in create new user in database => ${err}`))
    return next(err)
  }
})




export const login=asyncHandler(async(req,res,next)=>{
  const {email,password,role}=req.body

   if(!email || !password || !role)
    return next(new ApiError("Please provide all the fields...",400))

    
   const user=await User.findOne({email}).select("+password");
  
     if(!user)
      return next(new ApiError("user not found.",404))

     if(user.role!=role)
      return next(new ApiError(`NO such user find for ${role} role`,404))

    const isPasswordMatched= await user.isPasswordCorrect(password);
    if(!isPasswordMatched)
      return next(new ApiError("Password not matched !",400))


      const accessToken=user.generateJWTToken();
      const options={
          expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
          httpOnly:true,
          secure:true,
          sameSite: 'None' // Allow cross-site cookies
      }

      user.password=undefined
     res.status(200)
        .cookie("accessToken",accessToken,options)
        .json(new ApiResponse(200,{user},"loged in successfully."))
})



export const logout=asyncHandler(async(req,res)=>{
      const options={
        httpOnly:true,
        secure:true,
        sameSite: 'None' // Allow cross-site cookies
      }
      try {
         res.status(200)
            .clearCookie('accessToken',options)
            .json(new ApiResponse(200,req.user,"user logged out successfully"))
      } catch (error) {
         return next(new ApiError("error in logging out user"))
      }
})



export const getuser=asyncHandler(async(req,res)=>{
      res.status(200)
     .json(new ApiResponse(200,{user:req.user},"current user fetched successfully"))
})

export const userCount=asyncHandler(async(req,res,next)=>{
  try{
     const jobSeekers= await User.find({role:"Job Seeker"});
     const recruiters=await User.find({role:"Recruiter"})

     res.status(200)
     .json(new ApiResponse(200,{jobSeekers,recruiters},"userCount fetched successfully"))
  }
  catch(err){
    return next(new ApiError(`error in fetching userCount :${err}`),400)
  }
})