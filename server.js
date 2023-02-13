import express from "express";
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

app.use(express.json())

app.get('/',(req,res)=>{
    return res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware)
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