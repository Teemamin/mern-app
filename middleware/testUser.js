import { BadRequestError } from "../errors/index.js";



const testUser = (req,res,next)=>{
    const testUser = req.user.testUser
    if(testUser){
        throw new BadRequestError('Test user, Read only access!')
    }
    next()
}

export default testUser