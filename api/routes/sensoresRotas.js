import express from "express"
import sensoresController from "../controllers/sensoresControllers"
const router = express.Router()

router.post("/new", sensoresController.novo)
router.get("/", sensoresController.listar)
router.patch("/editar/:id", sensoresController.editar)
router.delete("/:id", sensoresController.desativar)

export default router
