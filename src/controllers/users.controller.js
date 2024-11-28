import { userService } from "../services/index.js"
import { gerenateInfoError } from "../services/errors/info.js"
import { EErrors } from "../services/errors/enum.js"
import CustomError from "../services/errors/custom-error.js"

const createUser = async(req, res, next)=>{
    const {first_name, last_name, email, password} = req.body
    try {
        if(!first_name || !last_name || !email || !password){
            throw CustomError.createError({
                name: "New user, data massing",
                cause: gerenateInfoError({first_name, last_name, email,password}),
                message: "Error when trying to create user",
                code: EErrors.INVALID_TYPE
            })
        }
        const newUser = await userService.createUser({
            first_name,
            last_name,
            email, 
            password
        })
        console.log(newUser);
        res.send({status:"success", payload: newUser})
    } catch (error) {
        next(error)
    }
} 

const getAllUsers = async(req,res)=>{
    try {
        const users = await userService.getAll();
        res.send({status:"success",payload:users})
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
}

const getUser = async(req,res)=> {
    try {
        const userId = req.params.uid
        const user = await userService.getUserById(userId)

        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        res.send({status:"success",payload:user})
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
}

const updateUser = async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    try {
        const user = await userService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error", error:"User not found"})

        const result = await userService.update(userId,updateBody);
        res.send({status:"success",message:"User updated", payload:result})
    } catch (error) {
        res.status(500).send("Error Interno del servidor")
    }
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid
    try {
        const result = await userService.getUserById(userId);
        res.send({status:"success",message:"User deleted", payload: result})
    } catch (error) {
        res.status(500).send("Error Interno del servidor")
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser
}