import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId)=>{
    // if(requestUser.role === 'admin') return  currently do not have admin but incase we do in the future
    if(requestUser.userId === resourceUserId.toString())return // the id matches we return,that means the user has permission
    throw new UnauthenticatedError('You have no permissions for the resource') //else we throw the error
}

export default checkPermissions