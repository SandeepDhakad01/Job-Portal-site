import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import 'dotenv/config';


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


export const uploadToCloudinary=async(localFilePath)=>{

     try{
        if(!localFilePath)
             throw new Error("localFilePath is not valid");
        
        console.log(localFilePath)
         const response=await cloudinary.uploader.upload(localFilePath,{ resource_type: "auto"})

            console.log("file is successfully uploaded on cloudinary !")

            return response;   // hume response.url ka use hoga ...
     }
     catch(err){
       throw new Error("Problem in uploading the file on Cloudinary",err)
     }
     finally{
        fs.unlinkSync(localFilePath)  
    }
      
}






// export const uploadToCloudinary = async (fileBuffer) => {
//   try {
//     if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
//       throw new Error('File buffer is invalid');
//     }

//     const cloudinaryResponse = await cloudinary.uploader.upload(fileBuffer, {
//       resource_type: 'auto',
//     });

//     if (!cloudinaryResponse) {
//       throw new Error('Failed to upload file to Cloudinary');
//     }

//     return cloudinaryResponse;
//   } catch (error) {
//     throw new Error('Error uploading file to Cloudinary: ' + error.message);
//   }
// };
