import {StatusCodes} from 'http-status-codes'

const errorHandlerMiddleWare = (error,req,res,next)=>{
    console.log(error)
    const defaultError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || 'something went wrong, try again later'
    }
    if(error.name === 'ValidationError'){
        //the error was triggered by the required fields in the user model
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // defaultError.msg = error.message
        defaultError.msg = Object.values(error.errors).map((item)=>item.message).join(',')
    }
    if(error.code && error.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(error.keyValue)} field must not be unique`
    }

    return res.status(defaultError.statusCode).json({msg:defaultError.msg})

    // return res.status(defaultError.statusCode).json({msg:error})
}

export default errorHandlerMiddleWare