import express from "express"
import atuadoresController from "../controllers/atuadoresController.js"
import sensoresController from "../controllers/sensoresControllers-ESS025N1491325.js"
const router = express.Router()

router.get("/", atuadoresController.listar)
router.delete("/:id", sensoresController.desativar) // nao vai deletar, vai so colocar o estado dele como inativo

export default router
