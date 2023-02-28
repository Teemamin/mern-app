import CustomApiError from "./custom-api.js"
import {StatusCodes} from 'http-status-codes'

class BadRequestError extends CustomApiError{
    // We can have the BadRequestError,  NotFoundError directly extending the JS builtin Error class
    // One reason we are extending CustomAPIError is if we want to enhance the 
    //  class in future with more default options set already in it.
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError