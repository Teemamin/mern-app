const attachCookie = ({res,token})=>{
    const oneDay = 1000 * 60 * 60 * 24;
    //dont need to add a return the cookie is added to the res obj
    res.cookie('token', token, {
        expires: new Date(Date.now() + oneDay),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' //this will be true in production
    })
}

export default attachCookie
//as oppose to passing the token via json in res, sending the token via cookies means the browser will 
//automatically include the token from the cookie in subsequent requests