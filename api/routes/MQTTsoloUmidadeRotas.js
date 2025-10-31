import { onMessage, TOPICO_UMIDADE_SOLO } from "../services/teste_mqttServices.js";

let soloUmidade = "";

onMessage(TOPICO_UMIDADE_SOLO, (message) => {
    soloUmidade = message;
})

class MQTTsoloUmidadeRota {
    static lerDadosSensor(req, res) {
        try {
            res.status(200).json({soloUmidade})
        } catch (error) {
            res.status(500).json({message: "Erro interno ao obter status"})
        }
    }
}

export default MQTTsoloUmidadeRota;