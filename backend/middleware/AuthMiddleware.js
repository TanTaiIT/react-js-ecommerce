import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from './../models/UserModel.js'
const protect = asyncHandler(async(req,res,next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            let user
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            next()
        }catch(err){
            console.log(err)
            res.status(404)
            throw new Error(" Not authorization,not token")
        }
    }
    if(!token){
        res.status(404)
        throw new Error("Not authorization, not token")
    }
})

export default protect