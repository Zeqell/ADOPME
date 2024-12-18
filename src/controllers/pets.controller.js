import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";

const getAllPets = async(req,res)=>{
    try {
        const pets = await petsService.getAll()
        res.send({status:"success",payload:pets})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body
    try {
        if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
        const pet = PetDTO.getPetInputFrom({name,specie,birthDate})
        const result = await petsService.create(pet)

        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send({status:"error",error})
    }
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body
    const petId = req.params.pid
    try {
        const result = await petsService.update(petId,petUpdateBody);
        res.send({status:"success",message:"pet updated", payload: result})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const deletePet = async(req,res)=> {
    try {
        const petId = req.params.pid;
        const result = await petsService.delete(petId);
        res.send({status:"success",message:"pet deleted", payload:result});
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    try {
        const {name,specie,birthDate} = req.body;
        if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
        console.log(file);
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image:`${__dirname}/../public/img/${file.filename}`
        });
        console.log(pet);
        const result = await petsService.create(pet);
        res.send({status:"success",payload:result})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}