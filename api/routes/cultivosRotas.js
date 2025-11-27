import express from "express"
import cultivosController from "../controllers/cultivosController.js"
import { autenticarToken } from "../controllers/userController.js"
const router = express.Router()

router.get("/", autenticarToken, cultivosController.listarTodos)
router.post("/new", autenticarToken, cultivosController.novo)
router.patch("/editar/:id_cultivo", autenticarToken, cultivosController.editar)
router.delete("/:id_cultivo", autenticarToken, cultivosController.excluirCultivo)

export default router