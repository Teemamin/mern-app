import mongoose from "mongoose";
mongoose.set('strictQuery', true)

const connectDB = (url)=>{
    return mongoose.connect(url)
}// it returns a promise

export default connectDB