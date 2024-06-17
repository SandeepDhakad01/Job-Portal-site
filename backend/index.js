import app from "./app.js"
import { dbConnect } from "./src/database/index.js"

 dbConnect()
 .then(()=>{
    app.listen(process.env.PORT,()=>{console.log("server is running on port :",process.env.PORT)})
 })
 .catch((err)=>{
    console.log(err)
 })
