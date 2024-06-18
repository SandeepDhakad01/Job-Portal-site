import express from 'express';
import cors from 'cors'
//import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//import middlewares
import { errorHandlerMiddleware } from './src/middlewares/errorHandler.Middleware.js';



const app=express();

// dotenv.config({
//     path:"./.env"
// })

app.use(cors({
    origin:process.env.FRONTEND_URL, // ek se jada url ke liye array bhi de sakte h
    methods:["GET", "POST", "DELETE", "PUT"],
    credentials:true
}))

// app.use(cors({
//     origin: 'http://localhost:5173', 
//     credentials: true 
//   }));

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))



 // import routes

 import userRouter from './src/routes/userRouter.js';
 import jobRouter from './src/routes/jobRouter.js';
 import applicationRouter from './src/routes/applicationRouter.js';

app.use('/api/v1/user',userRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/application',applicationRouter)



app.use(errorHandlerMiddleware)

export default app;