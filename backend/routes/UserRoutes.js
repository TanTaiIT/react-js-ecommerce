import express from 'express'
import asyncHandler from 'express-async-handler'
import protect from '../middleware/AuthMiddleware.js'
import generateToken from '../utils/generateToken.js'
import User from "./../models/UserModel.js"
const userRouter = express.Router()

userRouter.get('/',asyncHandler(async(req,res)=>{
    const user = await User.find({})
    res.json({user})
}))
userRouter.post('/login',asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
            createdAt:user.createdAt
        })
    }else{
        res.status(404)
        throw new Error("Invalid Email or Password")
    }
}))
userRouter.get('/profile',protect,asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            createdAt:user.createdAt
        })
    }else{
        res.status(404)
        throw new Error("User not Found")
    }
}))
userRouter.post('/register',asyncHandler(async(req,res)=>{
    const {email, name, password} = req.body
    const existUser = await User.findOne({email})
    if(existUser){
        res.status(400)
        throw new Error("User is alredy exist")
    }else{
        const user = await User.create({
            name,
            email,
            password
        })
        if(user){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error("Invalid user Data")
        }
    }
}))

userRouter.put('/profile',protect, asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        // user.password = req.body.password || user.password
        if(req.body.password){
            user.password = req.body.password 
        }
       
        const updateUser = await user.save()
        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            createdAt: updateUser.createdAt,
            token:generateToken(updateUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
}))
export default userRouter

