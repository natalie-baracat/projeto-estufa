import express from "express"
import leiturasController from "../controllers/leiturasController"
const router = express.Router()

router.get("/leituras", leiturasController.listar)

export default router
