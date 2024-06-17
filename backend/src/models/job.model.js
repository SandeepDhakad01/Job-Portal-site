import mongoose from "mongoose"

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide job title"],
    },
    company:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:[true,"Please provide job description"],
        minLength:[50,"job description must contain atleast 50 characters!"]
    },
    category:{
        type:String,
        required:[true,"please provide category of job"]
    },

    country:{
        type:String,
        required:[true,"Please provide the country where job is available"]
    },
    city:{
        type:String,
        required:[true,"please provide city name"]
    },
    location:{
        type:String,
        required:[true,"please provide exact location"]
    },
    fixedSalary:{
        type:Number,
    },
    salaryFrom:{
        type:Number,
    },
    salaryTo:{
        type:Number
    },
    expired:{
        type:Boolean,
        default:false
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    fullTime:{
        type:Boolean,
        required:true
    },
    remote:{
        type:Boolean,
        required:true
    }

},
{
    timestamps:true
}
)


export const Job=mongoose.model("Job",jobSchema)