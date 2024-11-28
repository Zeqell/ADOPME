import { Router } from "express"
import mockController from "../controllers/mock.controller.js"

const router = Router()

router.get("/mockingpets", mockController.getMockingPets)
router.get("/mockingusers", mockController.getMockingUsers)
router.post("/generatedata", mockController.generateData)

export default router