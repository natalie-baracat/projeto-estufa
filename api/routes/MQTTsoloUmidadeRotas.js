// import { onMessage, /*TOPICO_UMIDADE_SOLO, TOPICO_CONDICAO_SOLO, */ TOPICO_STATUS_RELE_BOMBA, TOPICO_SOLO } from "../services/mqttClient.js";

// let ultimaLeituraSolo = null;   // vai guardar { id_sensor, valor, faixa }
// let statusReleBomba = "";       // status da bomba (LIGADO/DESLIGADO)

// // Recebe a leitura completa do solo via JSON
// onMessage(TOPICO_SOLO, (message) => {
//     try {
//         const dado = JSON.parse(message);
//         ultimaLeituraSolo = dado;  // exemplo: { id_sensor: 5, valor: 2300, faixa: "SECO" }
//     } catch (erro) {
//         console.error("Erro ao interpretar JSON do solo:", erro);
//     }
// });

// // Recebe status do relé (bomba d'água)
// onMessage(TOPICO_STATUS_RELE_BOMBA, (message) => {
//     statusReleBomba = message; // "LIGADO" ou "DESLIGADO"
// });

// class MQTTsoloUmidadeRota {
//     static lerDadosSensor(req, res) {
//         try {
//             res.status(200).json({
//                 solo: ultimaLeituraSolo,
//                 statusReleBomba
//             });
//         } catch (error) {
//             res.status(500).json({ message: "Erro interno ao obter dados MQTT" });
//         }
//     }
// }

// export default MQTTsoloUmidadeRota;