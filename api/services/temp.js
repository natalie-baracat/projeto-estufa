import mqtt from "mqtt";

//Configurações do broker
const MQTT_BROKER_HOST = '9d19cc700cc44018b16cc529b323fc9d.s1.eu.hivemq.cloud';
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = 'ricardodias';
const MQTT_PASSWORD = 'TesteSenai1';

//topicos mqtt
const TOPICO_STATUS = 'aulaLed/26/status';
const TOPICO_COMANDO_LED = 'aulaLed/26/estadoLed';

const STATUS_BOIA = 'aulaLed/26/statusBoia';

const TOPICO_TEMPERATURA = "projeto/26/temperatura";
const TOPICO_UMIDADE = "aulaLed/26/umidade";

const TOPICO_UMIDADE_SOLO = "projeto/26/sensorumidade"
const TOPICO_CONDICAO_SOLO = "projeto/26/condicaosolo"
const TOPICO_COMANDO_BOMBA_AGUA = "projeto/26/bombaagua"


let mqttClient;
let subscriptions = {};

//conexao
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
};

function conectarMqtt() {
    console.log('Tentando conectar ao broker MQTT...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    mqttClient.on('connect', () => {
        console.log('Conectado com sucesso!');

        // led
        mqttClient.subscribe(TOPICO_STATUS, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_STATUS}`);
            }
        })
        mqttClient.subscribe(TOPICO_COMANDO_LED, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_COMANDO_LED}`);
            }
        })

        // boia
        mqttClient.subscribe(STATUS_BOIA, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${STATUS_BOIA}`);
            }
        })

        // umidade e temperatura do ar
        mqttClient.subscribe(TOPICO_TEMPERATURA, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_TEMPERATURA}`);
            }
        })
        mqttClient.subscribe(TOPICO_UMIDADE, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_UMIDADE}`);
            }
        })

        // solo e bomba d'agua
        mqttClient.subscribe(TOPICO_UMIDADE_SOLO, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_UMIDADE_SOLO}`);
            }
        })
        mqttClient.subscribe(TOPICO_CONDICAO_SOLO, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_CONDICAO_SOLO}`);
            }
        })
        mqttClient.subscribe(TOPICO_COMANDO_BOMBA_AGUA, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_COMANDO_BOMBA_AGUA}`);
            }
        })
    })
    mqttClient.on("message", (topic, message) => {
        // verificar se existe um topico na lista de assinaturas
        if (subscriptions[topic]) {
            subscriptions[topic](message.toString());
        }
    })
    mqttClient.on("error", (error => console.error("Erro de conexao", error)))
    mqttClient.on("close", (() => console.error("Conexão MQTT fechada.")))
}

// registrar funçao de callback para um topico especifico
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

export { publicar, onMessage, TOPICO_STATUS, TOPICO_COMANDO_LED, STATUS_BOIA, TOPICO_TEMPERATURA, TOPICO_UMIDADE, TOPICO_UMIDADE_SOLO, TOPICO_CONDICAO_SOLO, TOPICO_COMANDO_BOMBA_AGUA }