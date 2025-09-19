import express from "express"
import relatorioController from "../controllers/relatoriosController.js"
const router = express.Router()

router.get("/", relatorioController.listarTodos)
router.post("/new", relatorioController.novoRelatorio)
// router.patch("/editar/:id_relatorio", relatorioController.editarRelatório)
router.delete("/:id_relatorio", relatorioController.excluirRelatorio)

export default router