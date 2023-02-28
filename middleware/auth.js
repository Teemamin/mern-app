import { UnauthenticatedError } from "../errors/index.js"
import jwt from 'jsonwebtoken'

const authenticateUser = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Unauthorized user')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        // req.user = payload
        req.user = { userId: payload.userId };
        console.log(req.user)
        next()
    } catch (error) {
        throw new UnauthenticatedError('Unauthorized user')
    }  
}

export default authenticateUser