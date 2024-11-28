import { userService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import configObject from "../config/config.js";
import UserDTO from '../dto/User.dto.js';

const {secret_cookie, secret_token } = configObject

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" })
        const exists = await userService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" })
        const hashedPassword = await createHash(password)
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        let result = await userService.create(user)
        console.log(result)
        res.send({ status: "success", payload: result._id })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" })
        const user = await userService.getUserByEmail(email)
        if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"})

        const isValidPassword = await passwordValidation(user,password)
        if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"})

        const userDto = UserDTO.getUserTokenFrom(user)
        const token = jwt.sign(userDto, secret_token,{expiresIn:"1h"})

        res.cookie(secret_cookie, token,{maxAge:3600000}).send({status:"success",message:"Logged in"})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const current = async(req,res) =>{
    try {
        const cookie = req.cookies[secret_cookie]
        const user = jwt.verify(cookie, secret_token);
        if(user)
            return res.send({status:"success",payload:user})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const unprotectedLogin  = async(req,res) =>{
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const user = await userService.getUserByEmail(email);
        if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
        const isValidPassword = await passwordValidation(user,password);
        if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
        const token = jwt.sign(user, secret_token,{expiresIn:"1h"});
        res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}
const unprotectedCurrent = async(req,res)=>{
    try {
        const cookie = req.cookies['unprotectedCookie']
        const user = jwt.verify(cookie, secret_token);
        if(user)
            return res.send({status:"success",payload:user})
    } catch (error) {
        res.status(500).send("Internal Server Error", error)   
    }
}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}