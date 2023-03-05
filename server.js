import 'express-async-errors';
import express from "express";
import morgan from 'morgan';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//sequirty packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

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
    app.use(morgan('dev'));//http logger middleware for node.js
  }

const __dirname = dirname(fileURLToPath(import.meta.url));//cos we are using ES6 module, as oppose to commonJS we have to make this roundabout to get the __dirname

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json())
app.use(cookieParser())
//security packages
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


app.get('/api/v1',(req,res)=>{
    return res.json({msg:'hello from express'})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser,jobsRouter);


// only when ready to deploy
//it is important to have this after our api routes, this will redirect all get requests to the react app,after checking our default routes above first
//if the request is to one of their defined routes else pass the get request to our react app
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

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