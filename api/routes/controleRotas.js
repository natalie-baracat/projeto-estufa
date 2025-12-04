import express from "express";
import {
  publicar,
  onMessage,
  TOPICO_MODO_IRRIGACAO,
  TOPICO_STATUS_BOMBA1,
  TOPICO_STATUS_BOMBA2,
  TOPICO_STATUS_BOMBA3
} from "../services/mqttClient.js";

const router = express.Router();

// STATUS EM MEMÓRIA
let statusBombas = {
  bomba1: "DESLIGADO",
  bomba2: "DESLIGADO",
  bomba3: "DESLIGADO",
  modo: "AUTOMATICO"
};

// ===============================
// RECEBE STATUS DO MQTT (DINÂMICO)
// ===============================

// modo
onMessage(TOPICO_MODO_IRRIGACAO, (msg) => {
  console.log("Modo recebido via MQTT:", msg);
  statusBombas.modo = msg;
});

// status das bombas
onMessage(TOPICO_STATUS_BOMBA1, (msg) => {
  console.log("Status bomba1 via MQTT:", msg);
  statusBombas.bomba1 = msg;
});

onMessage(TOPICO_STATUS_BOMBA2, (msg) => {
  console.log("Status bomba2 via MQTT:", msg);
  statusBombas.bomba2 = msg;
});

onMessage(TOPICO_STATUS_BOMBA3, (msg) => {
  console.log("Status bomba3 via MQTT:", msg);
  statusBombas.bomba3 = msg;
});

// ===============================
//      ROTAS HTTP
// ===============================

// GET /controle-mqtt/status
router.get("/status", (req, res) => {
  return res.json(statusBombas);
});

// POST /controle-mqtt/modo
router.post("/modo", (req, res) => {
  const { modo } = req.body;

  if (!["MANUAL", "AUTOMATICO"].includes(modo)) {
    return res.status(400).json({ error: "Modo inválido" });
  }

  publicar(TOPICO_MODO_IRRIGACAO, modo);
  statusBombas.modo = modo;

  res.json({ success: true, modo });
});

// POST /controle-mqtt/bomba
router.post("/bomba", (req, res) => {
  const { bomba, comando } = req.body;

  if (![1, 2, 3].includes(bomba)) {
    return res.status(400).json({ error: "Bomba inválida" });
  }

  if (!["ON", "OFF"].includes(comando)) {
    return res.status(400).json({ error: "Comando inválido" });
  }

  const topico = `floradata/26/bomba${bomba}`;
  publicar(topico, comando);

  res.json({ success: true });
});

export default router;
