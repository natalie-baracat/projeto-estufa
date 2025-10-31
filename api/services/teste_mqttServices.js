import mqtt from "mqtt";

//Configurações do broker
const MQTT_BROKER_HOST = "695ed70b392f4191993cb40e09bc1ecd.s1.eu.hivemq.cloud";
const MQTT_BROKER_PORT = 8884;
const MQTT_USERNAME = "natalie";
const MQTT_PASSWORD = "Mercipourlevenin7";

//topicos mqtt
const TOPICO_UMIDADE_SOLO = "floradata/26/sensorumidadesolo";
const TOPICO_CONDICAO_SOLO = "floradata/26/condicaosolo";
const TOPICO_COMANDO_BOMBA_AGUA = "floradata/26/bombaagua";

let mqttClient;
let subscriptions = {};

//conexao
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: "mqtts",
    reconnectPeriod: 1000,
};

function conectarMqtt(){
    console.log("Tentando conectar ao broker MQTT...");
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    mqttClient.on("connect", () =>{
        console.log("Yippieee!!! Conectado com sucesso!");

         mqttClient.subscribe(TOPICO_UMIDADE_SOLO, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${TOPICO_UMIDADE_SOLO}`);
            }
        });

        mqttClient.subscribe(TOPICO_CONDICAO_SOLO, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_CONDICAO_SOLO}`);
            }
        });

        mqttClient.subscribe(TOPICO_COMANDO_BOMBA_AGUA, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_COMANDO_BOMBA_AGUA}`);
            }
        });
    });

    mqttClient.on("message", (topic, message) => {
        // verificar se existe um topico na lista de assinaturas
        if (subscriptions[topic]) {
            subscriptions[topic](message.toString());
        }
    })
    mqttClient.on("error", (error => console.error("Erro de conexão", error)))
    mqttClient.on("close", (() => console.error("Conexão MQTT fechada.")))
}

// registrar funçao de callback para um topico especifico
function onMessage(topic, callback) {
    subscriptions[topic] = callback;
}

function publicar(topic, message) {
    if (mqttClient && mqttClient.connected) {
        mqttClient.publish(topic, message, {retain: true});
        console.log(`Publicado no topico ${topic}: ${message}`);
        
    } else {
        console.error("Erro ao publicar, cliente nao esta conectado");
        
    }
}

conectarMqtt();

export { publicar, onMessage, TOPICO_UMIDADE_SOLO, TOPICO_CONDICAO_SOLO, TOPICO_COMANDO_BOMBA_AGUA }