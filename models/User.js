import mongoose from "mongoose";
import validator from "validator";

const {Schema} = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    lastName:   {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'lastName'
    },
    email:   {
        type: String,
        required: [true, 'Please Provide email'],
        validate:{
            validator: validator.isEmail,
            message:'Please provide valid email'
            },
        unique: true
    },
    password:   {
        type: String,
        required: [true, 'Please Provide password'],
        minLength: 6,
    },
    location:  {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'myCity'
    },
})

export default mongoose.model('User', UserSchema)