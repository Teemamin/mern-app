import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        select: false
    },
    location:  {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'myCity'
    },
})

UserSchema.pre('save',async function (){
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    //to avoid rehashing the password n cousing bugs everytime save() is called, chk if password field is not being changed, exit the func else run the harsh paswrd logic
    if(!this.isModified('password')) return
   const salt = await bcrypt.genSalt(10)
   this.password = await  bcrypt.hash(this.password,salt)
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

UserSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)