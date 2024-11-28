import GenericRepository from "./GenericRepository.js"

export default class UserRepository extends GenericRepository{
    constructor(dao){
        super(dao)
    }
    createUser = (doc)=>{
        return this.create(doc)
    }
    getUserByEmail = (email) =>{
        return this.getBy({email})
    }
    getUserById = (id) =>{
        return this.getBy({_id:id})
    }
}
