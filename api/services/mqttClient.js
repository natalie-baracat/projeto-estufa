// mqttClient.js (corrigido para receber JSON em floradata/26/solo)
// Mantive sua estrutura original: subscriptions, publicar, onMessage, logs.

import mqtt from "mqtt";
import { BD } from "../db.js";  

//Configurações do broker
const MQTT_BROKER_HOST = "695ed70b392f4191993cb40e09bc1ecd.s1.eu.hivemq.cloud";
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = "natalie";
const MQTT_PASSWORD = "Mercipourlevenin7";

// Tópicos (agora usamos um tópico único para leituras do solo)
const TOPICO_SOLO = "floradata/26/solo";
const TOPICO_COMANDO_BOMBA_AGUA = "floradata/26/bombaagua";
const TOPICO_STATUS_RELE_BOMBA = "floradata/26/statusRele";
const TOPICO_MODO_IRRIGACAO = "floradata/26/modoIrrigacao";

let mqttClient;
let subscriptions = {};

// opções de conexão
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
    clientId: 'backendmqtt'
};

function conectarMqtt(){
    console.log('Tentando conectar ao broker MQTT...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    mqttClient.on('connect', () => {
        console.log("Yippieee!!! Conectado com sucesso!");

        // subscrever apenas nos tópicos necessários
        mqttClient.subscribe(TOPICO_SOLO, (err) => {
            if(!err) console.log(`Inscrito no tópico ${TOPICO_SOLO}`);
            else console.error(`Erro ao se inscrever em ${TOPICO_SOLO}:`, err);
        });

        mqttClient.subscribe(TOPICO_COMANDO_BOMBA_AGUA, (err) => {
            if (!err) console.log(`Inscrito no tópico ${TOPICO_COMANDO_BOMBA_AGUA}`);
            else console.error(`Erro ao se inscrever em ${TOPICO_COMANDO_BOMBA_AGUA}:`, err);
        });

        mqttClient.subscribe(TOPICO_STATUS_RELE_BOMBA, (err) => {
            if (!err) console.log(`Inscrito no tópico ${TOPICO_STATUS_RELE_BOMBA}`);
            else console.error(`Erro ao se inscrever em ${TOPICO_STATUS_RELE_BOMBA}:`, err);
        });

        mqttClient.subscribe(TOPICO_MODO_IRRIGACAO, (err) => {
            if (!err) console.log(`Inscrito no tópico ${TOPICO_MODO_IRRIGACAO}`);
            else console.error(`Erro ao se inscrever em ${TOPICO_MODO_IRRIGACAO}:`, err);
        });
    });

    mqttClient.on("message", async (topic, message) => {
        const msg = message.toString();
        console.log(`Mensagem recebida em ${topic}:`, msg);

        // chama callbacks registrados (onMessage)
        if (subscriptions[topic]) {
            try {
                subscriptions[topic](msg);
            } catch (e) {
                console.error("Erro no callback registrado para tópico:", topic, e);
            }
        }

        // PROCESSAMENTO CENTRAL: salvar leituras do solo quando JSON chegar
        try {
            if (topic === TOPICO_SOLO) {
                // Esperamos JSON: { "id_sensor": 5, "valor": 2240, "faixa": "Ideal" }
                let dado;
                try {
                    dado = JSON.parse(msg);
                } catch (errJson) {
                    console.warn("Mensagem no tópico SOLO não é JSON válido:", msg);
                    return;
                }

                // Validações mínimas
                const idSensor = Number(dado.id_sensor);
                const valor = Number(dado.valor);
                const faixa = dado.faixa ? String(dado.faixa).trim() : null;

                if (!idSensor || Number.isNaN(valor) || !faixa) {
                    console.warn("Dados incompletos na mensagem do SOLO. Esperado {id_sensor, valor, faixa} ->", dado);
                    return;
                }

                // Inserir no banco (parâmetros na ordem certa)
                await BD.query(
                    `INSERT INTO leituras_solo (id_sensor, valor, faixa, criado_em)
                     VALUES ($1, $2, $3, NOW())`,
                    [idSensor, valor, faixa]
                );

                console.log("💾 Leitura do solo salva no banco:", { idSensor, valor, faixa });
            }

            // Se quiser tratar outros tópicos com inserts mais tarde, aqui é o lugar.
        } catch (err) {
            console.error("❌ Erro ao salvar leitura:", err.message || err);
        }
    });

    mqttClient.on("error", (error) => {
        console.error("Erro de conexão MQTT:", error);
    });

    mqttClient.on("close", () => {
        console.warn("Conexão MQTT fechada.");
    });

    mqttClient.on("reconnect", () => {
        console.log("Tentando reconectar ao MQTT...");
    });

    mqttClient.on("offline", () => {
        console.warn("Cliente MQTT offline");
    });
}

// registrar função de callback para um topico especifico
function onMessage(topic, callback) {
    subscriptions[topic] = callback;
}

function publicar(topic, message) {
    if (mqttClient && mqttClient.connected) {
        mqttClient.publish(topic, message, { retain: true });
        console.log(`Publicado no topico ${topic}: ${message}`);
    } else {
        console.error("Erro ao publicar, cliente nao esta conectado");
    }
}

conectarMqtt();

export {
    publicar,
    onMessage,
    TOPICO_SOLO,
    TOPICO_COMANDO_BOMBA_AGUA,
    TOPICO_STATUS_RELE_BOMBA,
    TOPICO_MODO_IRRIGACAO
};
