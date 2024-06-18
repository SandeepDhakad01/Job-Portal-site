import mongoose from "mongoose";

const dbname="RealDB-real" 

export const dbConnect=async()=>{
    try{
        const DB_instance=await mongoose.connect(process.env.MONGODB_URI)
       
         console.log("Successfully Connected to DataBase !")

    }

    catch(err){
        console.log("Database connection failed ! ",err)
       }
}
