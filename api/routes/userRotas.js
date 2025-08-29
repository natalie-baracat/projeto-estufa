import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router()

router.post("/usuarios/new", userController.novo)
router.post("/usuarios/login", userController.login)
router.get("/usuarios/", userController.listar)
router.patch("usuarios/editar/:id", userController.editar)
router.delete("usuarios/:id", userController.desativar)

export default router