#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "SEU_WIFI";
const char* password = "SENHA_WIFI";
const char* mqttServer = "BROKER_IP";
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

const int releVentilador = 5; // GPIO
const int releBomba = 4;      // GPIO

void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) msg += (char)payload[i];

  if (String(topic) == "estufa/ventilador") {
    if (msg.indexOf("on") >= 0) digitalWrite(releVentilador, HIGH);
    else digitalWrite(releVentilador, LOW);
  }

  if (String(topic) == "estufa/bomba") {
    if (msg.indexOf("on") >= 0) digitalWrite(releBomba, HIGH);
    else digitalWrite(releBomba, LOW);
  }
}

void setup() {
  pinMode(reléVentilador, OUTPUT);
  pinMode(releBomba, OUTPUT);
  digitalWrite(reléVentilador, LOW);
  digitalWrite(releBomba, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32_Estufa")) {
      client.subscribe("estufa/ventilador");
      client.subscribe("estufa/bomba");
    } else {
      delay(5000);
    }
  }
}

