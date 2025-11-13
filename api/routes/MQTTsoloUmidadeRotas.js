import { onMessage, TOPICO_UMIDADE_SOLO } from "../services/mqttClient.js";

let umidadeSolo = "";

onMessage(TOPICO_UMIDADE_SOLO, (message) => {
    umidadeSolo = message;
})

class MQTTsoloUmidadeRota {
    static lerDadosSensor(req, res) {
        try {
            res.status(200).json({umidadeSolo})
        } catch (error) {
            res.status(500).json({message: "Erro interno ao obter status"})
        }
    }
}

export default MQTTsoloUmidadeRota;