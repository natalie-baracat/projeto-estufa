import express from "express"
import leiturasController from "../controllers/leituraController"
const router = express.Router()

router.get("/", leiturasController.listar)
router.patch("/editar/:id", leiturasController.editar)

export default router
