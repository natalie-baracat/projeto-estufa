// versao criada no dia 31/10. as outras sao testes
// recomendaçao: FECHAR MQTT EXPLORER quando for testar no frontend
// mudar todo lugar que nao referencia esse arquivo

import mqtt from "mqtt";

//Configurações do broker
const MQTT_BROKER_HOST = "695ed70b392f4191993cb40e09bc1ecd.s1.eu.hivemq.cloud";
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = "natalie";
const MQTT_PASSWORD = "Mercipourlevenin7";

// const MQTT_BROKER_HOST = '9d19cc700cc44018b16cc529b323fc9d.s1.eu.hivemq.cloud';
// const MQTT_BROKER_PORT = 8883;
// const MQTT_USERNAME = 'ricardodias';
// const MQTT_PASSWORD = 'TesteSenai1';

//topicos mqtt
const TOPICO_UMIDADE_SOLO = "floradata/26/sensorumidadesolo";
const TOPICO_CONDICAO_SOLO = "floradata/26/condicaosolo";
const TOPICO_COMANDO_BOMBA_AGUA = "floradata/26/bombaagua";
const TOPICO_STATUS_RELE_BOMBA = "floradata/26/statusRele";

let mqttClient;
let subscriptions = {};

//conexao
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
    clientId: 'sensor_chuva_solo'
};

function conectarMqtt(){
    console.log('Tentando conectar ao broker MQTT...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    mqttClient.on('connect', () => {
        console.log("Yippieee!!! Conectado com sucesso!");

        mqttClient.subscribe(TOPICO_UMIDADE_SOLO, (err) => {
            if(!err) {
                console.log(`Inscrito no tópico ${TOPICO_UMIDADE_SOLO}`);
            } else {
                console.error(`Erro ao se inscrever em ${TOPICO_UMIDADE_SOLO}:`, err);
            }
        });

        mqttClient.subscribe(TOPICO_CONDICAO_SOLO, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_CONDICAO_SOLO}`);
            } else {
                console.error(`Erro ao se inscrever em ${TOPICO_CONDICAO_SOLO}:`, err);
            }
        });

        // isso vai MANDAR o comando PARA a bomba
        mqttClient.subscribe(TOPICO_COMANDO_BOMBA_AGUA, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_COMANDO_BOMBA_AGUA}`);
            } else {
                console.error(`Erro ao se inscrever em ${TOPICO_COMANDO_BOMBA_AGUA}:`, err);
            }
        });

        // isso RECEBE E EXIBE o status do rele (ou seja, da propria bomba)
        mqttClient.subscribe(TOPICO_STATUS_RELE_BOMBA, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_STATUS_RELE_BOMBA}`);                
            } else {
                console.error(`Erro ao se inscrever em ${TOPICO_STATUS_RELE_BOMBA}:`, err);
            }
        });
    });

    mqttClient.on("message", (topic, message) => {
        console.log(`Mensagem recebida em ${topic}:`, message.toString());
        // verificar se existe um topico na lista de assinaturas
        if (subscriptions[topic]) {
            subscriptions[topic](message.toString());
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

export { publicar, onMessage, TOPICO_UMIDADE_SOLO, TOPICO_CONDICAO_SOLO, TOPICO_COMANDO_BOMBA_AGUA, TOPICO_STATUS_RELE_BOMBA };