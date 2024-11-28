import UserModel from "./models/user.js";


export default class Users {
    
    get = (params) =>{
        return UserModel.find(params);
    }

    getBy = (params) =>{
        return UserModel.findOne(params);
    }

    save = (doc) =>{
        const user = new UserModel(doc)
        return user.save(doc);
    }

    update = (id,doc) =>{
        return UserModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return UserModel.findByIdAndDelete(id);
    }
    insert = (doc) =>{
        return UserModel.insertMany(doc)
    }
}