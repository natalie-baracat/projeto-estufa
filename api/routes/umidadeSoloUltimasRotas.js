import express from "express";
import { BD } from "../db.js";

const router = express.Router();

router.get("/ultimas", async (req, res) => {
  try {
    const result = await BD.query(`
      SELECT DISTINCT ON (id_sensor)
             id_sensor, valor, faixa, criado_em
      FROM leituras_solo
      ORDER BY id_sensor, criado_em DESC
    `);

    res.json(result.rows);

  } catch (err) {
    console.error("Erro ao buscar últimas leituras:", err);
    res.status(500).json({ erro: "Erro ao buscar últimas leituras" });
  }
});

export default router;
