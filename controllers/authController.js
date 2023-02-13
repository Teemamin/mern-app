import User from '../models/User.js'

const register = async (req,res,next)=>{
    try {
        const user = await User.create(req.body)
        return res.status(201).json({user})
    } catch (error) {
       next(error)
    }
    
}

const login = async (req,res,next)=>{
    return res.send('login route')
}

const updateUser = async (req,res,next)=>{
    return res.send('update user route')
}

export {register,login,updateUser}