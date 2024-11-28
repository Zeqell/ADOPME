import PetModel from "./models/pet.js";

export default class Pet {

    get = (params) =>{
        return PetModel.find(params)
    }

    getBy = (params) =>{
        return PetModel.findOne(params);
    }

    save = (doc) =>{
        return PetModel.create(doc);
    }

    update = (id,doc) =>{
        return PetModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return PetModel.findByIdAndDelete(id);
    }
    insert = (doc) =>{
        return PetModel.insertMany(doc)
    }
}