import Users from "../dao/users.dao.js"
import Pet from "../dao/pets.dao.js"
import Adoption from "../dao/adoption.dao.js"

import UserRepository from "../repository/UsersRepository.js"
import PetRepository from "../repository/PetsRepository.js"
import AdoptionRepository from "../repository/AdoptionRepository.js"

export const userService = new UserRepository(new Users())
export const petsService = new PetRepository(new Pet())
export const adoptionService = new AdoptionRepository(new Adoption())
