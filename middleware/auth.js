import { UnauthenticatedError } from "../errors/index.js"
import jwt from 'jsonwebtoken'

const authenticateUser = async (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthenticatedError('Authentication Invalid');
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '64009ec7542eeb84e237437e'
        // console.log(payload)
        // req.user = payload
        req.user = { userId: payload.userId, testUser };
        next()
    } catch (error) {
        throw new UnauthenticatedError('Unauthorized user')
    }  
}

export default authenticateUser