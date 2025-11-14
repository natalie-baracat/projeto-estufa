import express from "express";
import { publicar } from "../services/mqttClient.js";

const router = express.Router();

// tópico manual (ON/OFF)
const TOPICO_COMANDO_BOMBA = "floradata/26/bombaagua";

// tópico do modo (manual/automatico)
const TOPICO_MODO = "floradata/26/modoIrrigacao";

/*
 * POST /controle/modo
 * body: { modo: "manual" | "automatico" }
 */
router.post("/modo", (req, res) => {
    const { modo } = req.body;

    if (!modo || !["MANUAL", "AUTOMATICO"].includes(modo)) {
        return res.status(400).json({ erro: "Modo inválido" });
    }

    publicar(TOPICO_MODO, modo);

    return res.json({ ok: true, modo });
});

/*
 * POST /controle/comando
 * body: { comando: "ON" | "OFF" }
 */
router.post("/comando", (req, res) => {
    const { comando } = req.body;

    if (!comando || !["ON", "OFF"].includes(comando)) {
        return res.status(400).json({ erro: "Comando inválido" });
    }

    publicar(TOPICO_COMANDO_BOMBA, comando);

    return res.json({ ok: true, comando });
});

export default router;
