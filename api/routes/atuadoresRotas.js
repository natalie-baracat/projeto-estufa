import express from "express"
import atuadoresController from "../controllers/atuadoresController"
const router = express.Router()

router.get("/atuadores", atuadoresController.listar)
router.delete("/atuadores/:id", sensoresController.desativar) // nao vai deletar, vai so colocar o estado dele como inativo

export default router
