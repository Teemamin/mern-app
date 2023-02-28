import 'express-async-errors';
import express from "express";
import morgan from 'morgan';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
// connect db
import connectDB from "./db/connect.js";

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//Middelware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";
import authenticateUser from './middleware/auth.js';


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }
app.use(express.json())

app.get('/api/v1',(req,res)=>{
    return res.json({msg:'hello from express'})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser,jobsRouter);

app.use(notFoundMiddleware) // app.use signals to express i want all the http req, post,get ... if no route matches this will be used
//behind the scenes, express passes error to the last middleware where we can access it as a first parameter, if we setup 4 parameters.
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 5000;


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    
    } catch (error) {
        console.log(error)
    }
}
start()