import MockingService from "../services/mocking.js"
import {createHash} from "../utils/index.js"
import {petsService, userService} from "../services/index.js"

const getMockingPets = async (req, res)=>{
    try {
        const pets = await MockingService.generateMockingPets(100)
        res.send({status: "success", payload: pets})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}
const getMockingUsers = async (req, res)=>{
    try {
        const users = await MockingService.generateMockingusers(50)
        res.send({status: "success", payload: users})
    } catch (error) {
        res.status(500).send("Internal server error", error)
    }
}
const generateData = async (req, res)=>{
    try {
        const {users, pets} = req.body

        const petsList = await MockingService.generateMockingPets(Number(pets))
        //console.log("Generate Pets", petsList);
        const savePets = await petsService.insert(petsList)
        //console.log("Save pets", savePets);

        const userList = []
        for(let i = 0; i < Number(users); i++){
            let user = await MockingService.generateMockingusers(1)
            user[0].password = await createHash(user[0].password)

            userList.push(user[0])
        }
        const saveUser = await userService.insert(userList)
        console.log("Save Users", saveUser);

        return res.status(201).send({
            status: "success",
            generated:{
                user: saveUser.length,
                pets: savePets.length
            }
        })
    } catch (error) {
        console.log("Error generate data", error)
        return res.status(500).send("Internal server error")
    }

}
export default {getMockingPets, getMockingUsers, generateData}