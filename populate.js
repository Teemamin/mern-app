import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

const start = async ()=>{

    try {
        await connectDB(process.env.MONGO_URL);
        await Job.deleteMany();
    
        const jsonProducts = JSON.parse(
          await readFile(new URL('./mock-data.json', import.meta.url)) // we are using fs to read the file because of ES6 module, wont need that if using commonJS
        );
        await Job.create(jsonProducts);
        console.log('Success!!!!');
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()