import express from "express"
import leiturasController from "../controllers/leiturasController.js"
const router = express.Router()

router.get("/", leiturasController.listar)

export default router
