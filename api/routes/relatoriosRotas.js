import express from "express"
import relatorioController from "../controllers/relatoriosController.js"
const router = express.Router()

router.get("/relatorios", relatorioController.listarTodos)
router.post("/relatorios/new", relatorioController.novoRelatorio)
router.patch("/relatorios/editar/:id_relatorio", relatorioController.editarRelatório)
router.delete("/relatorios/:id_relatorio", relatorioController.excluirRelatorio)

export default router