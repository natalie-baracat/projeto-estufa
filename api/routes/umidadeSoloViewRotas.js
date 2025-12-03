import express from "express";
import { BD } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await BD.query(
            `SELECT * FROM umidade_solo_horaria ORDER BY hora ASC`
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Erro ao buscar view umidade_solo_horaria:", err);
        res.status(500).json({ error: "Erro ao obter dados da view" });
    }
});

export default router;