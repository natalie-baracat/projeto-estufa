import express from "express"
import cultivosController from "../controllers/cultivosController"
const router = express.Router()

router.get("/", cultivosController.listarTodos)
router.post("/new", cultivosController.novo)
router.patch("/editar/:id_cultivo", cultivosController.editar)
router.delete("/:id_cultivo", cultivosController.excluirCultivo)

export default router