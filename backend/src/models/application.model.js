import mongoose from "mongoose"


// const applicationSchema= new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,"please provide your name"],
//         minLength:[3,"Name must contain 3 characters"]
//     },
//     email:{
//         type:String,
//         required:[true,"please provide your email"],
//         trim:true,
//         lowercase:true,
//         validator:[validator.isEmail,"Please provide a valid email"]
//     },

//     coverLetter:{
//         type:String,
//         required:[true,"Please provide your cover letter"]
//     },
//     phone:{
//         type:Number,
//         required:[true,"Please provide your phone number"]
//     },
//     address:{
//         type:String,
//         required:[true,"Please provide your Address"]
//     },
//     resume:{
//         public_id:{
//             type:String,
//             required:true
//         },
//         url:{
//             type:String,
//             required:true
//         }
//     },
//     applicantID:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User",
//             required:true
//     }


// },
// {
//     timestamps:true
// }
// )


const applicationSchema=new mongoose.Schema({
    applicantID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide applicantID"]
    },
    jobID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:[true,"Please provide jobID"]
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide your coverLetter"]
    },
    // resume:{
    //             public_id:{
    //                 type:String,
    //                 required:true
    //             },
    //             url:{
    //                 type:String,
    //                 required:true
    //             }
    //         }
   resume:{
    type:String,
    required:[true,"Please provide your resume "]
   }
},{
    timestamps:true
})

export const Application=mongoose.model("Application",applicationSchema)