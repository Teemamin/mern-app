import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
//we are using the express-async-errors package to handle errors, if theres an error in any of the funcs it will b fowarded
//to the error middleware function with out having to call next()
import {BadRequestError,UnauthenticatedError} from '../errors/index.js'


const register = async (req,res,next)=>{
    const {name,password,email} = req.body
    if(!name || !password || !email){
        throw new BadRequestError('Please provide all values')
    }
    const emailAlreadyExist = await User.findOne({email})
    if(emailAlreadyExist){
        throw new BadRequestError('Email already in use')
    }
        const user = await User.create({name,email,password})
        const token = user.createJWT()
        //sending the user data like so, to ensure we do not send the password to the frontend
        return res.status(StatusCodes.CREATED).json({user:{
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },token,location:user.location})
}

const login = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const passwordMatch = await user.comparePassword(password)
    if(!passwordMatch){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    return res.status(StatusCodes.OK).json({user,token,location:user.location})
}

const updateUser = async (req,res,next)=>{
    const {email,name,lastName,location} = req.body
    if(!email || !name || !lastName || !location){
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findById({_id: req.user.userId})//userId is being set from auth middleware
    user.email = email
    user.name = name
    user.location = location
    user.lastName = lastName
    await user.save()
    const token = user.createJWT()

    return res.status(StatusCodes.OK).json({user,token,location:user.location})
}

export {register,login,updateUser}