import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils.js";

const userRouter = express.Router()

userRouter.post('/signin', async (req, res) => {


    let user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return
        }
    }

    res.status(401).send({ msg: "Isvalied Email or Password" })

})

userRouter.post('/signup', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })

    const Users = await newUser.save()
    
    res.send({
        _id: Users._id,
        name: Users.name,
        email: Users.email,
        isAdmin: Users.isAdmin,
        token: generateToken(Users)
    })
})

export default userRouter