import express from "express"
import { BD } from "../db.js";
const router = express.Router();


/**
 * GET /umidade-solo/horaria
 * Retorna min e max de cada hora (view PostgreSQL)
 */
router.get("/horaria", async (req, res) => {
  try {
    const result = await BD.query(
      `
      SELECT id_sensor, hora, umidade_min, umidade_max
      FROM umidade_solo_horaria
      ORDER BY id_sensor, hora ASC

      `
    );

    return res.json(result.rows);

  } catch (error) {
    console.error("Erro ao consultar PostgreSQL:", error);
    return res.status(500).json({ error: "Erro ao consultar o banco" });
  }
});

export default router;
