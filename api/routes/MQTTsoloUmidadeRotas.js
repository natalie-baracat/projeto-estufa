import { onMessage, TOPICO_UMIDADE_SOLO, TOPICO_CONDICAO_SOLO, TOPICO_STATUS_RELE_BOMBA } from "../services/mqttClient.js";

let umidadeSolo = "";
let condicaoSolo = "";
let statusReleBomba = "";

onMessage(TOPICO_UMIDADE_SOLO, (message) => {
    umidadeSolo = message;
})

onMessage(TOPICO_CONDICAO_SOLO, (message2) => {
    condicaoSolo = message2;
})

onMessage(TOPICO_STATUS_RELE_BOMBA, (message3) => {
    statusReleBomba = message3;
})

class MQTTsoloUmidadeRota {
    static lerDadosSensor(req, res) {
        try {
            res.status(200).json({umidadeSolo, condicaoSolo, statusReleBomba})
        } catch (error) {
            res.status(500).json({message: "Erro interno ao obter status"})
        }
    }
}

export default MQTTsoloUmidadeRota;