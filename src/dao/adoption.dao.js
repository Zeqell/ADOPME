import AdoptionModel from "./models/adoption.js";

export default class Adoption {

    get = (params) =>{
        return AdoptionModel.find(params);
    }

    getBy = (params) =>{
        return AdoptionModel.findOne(params);
    }

    save = (doc) =>{
        return AdoptionModel.create(doc);
    }

    update = (id,doc) =>{
        return AdoptionModel.findByIdAndUpdate(id,{$set:doc})
    }
    
    delete = (id) =>{
        return AdoptionModel.findByIdAndDelete(id);
    }
}