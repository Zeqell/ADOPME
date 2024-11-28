import { adoptionService, petsService, userService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    try {
        const result = await adoptionService.getAll();
        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid
    try {
        const adoption = await adoptionService.getBy({_id:adoptionId})
        if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
        res.send({status:"success",payload:adoption})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params
    try {
        const user = await userService.getUserById(uid);
        if(!user) return res.status(404).send({status:"error", error:"user Not found"});
        const pet = await petsService.getBy({_id:pid});
        if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
        if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
        user.pets.push(pet._id);
        await userService.update(user._id,{pets:user.pets})
        await petsService.update(pet._id,{adopted:true,owner:user._id})
        await adoptionService.create({owner:user._id,pet:pet._id})
        res.send({status:"success",message:"Pet adopted"})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}