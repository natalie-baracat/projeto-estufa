import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router()

router.post("/new", userController.novo)
router.post("/login", userController.login)
router.get("/", userController.listar)
router.patch("/editar/:id", userController.editar)
router.delete("/:id", userController.desativar)

export default router