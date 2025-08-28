//APENAS UM TESTE. SUJEITO A MUDANÇAS

import mqtt from 'mqtt';
import { BD } from '../api/db';

const brokerUrl = 'mqtt://broker.hivemq.com'; // ou outro broker, ex: mqtt://localhost:1883
const topic = 'estufa/sensores';

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('✅ Conectado ao broker MQTT');
  client.subscribe(topic, (err) => {
    if (err) console.error('Erro ao se inscrever no tópico:', err);
    else console.log(`📡 Inscrito no tópico: ${topic}`);
  });
});

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    // Exemplo de payload: { temperatura: 25.6, umidade: 70, solo: 30, timestamp: "2025-07-26T14:00:00Z" }
    const { temperatura, umidade, solo, timestamp } = payload;

    await BD.query(
      'INSERT INTO leituras_sensor (temperatura, umidade, solo, timestamp) VALUES ($1, $2, $3, $4)',
      [temperatura, umidade, solo, timestamp]
    );

    console.log('📥 Dados salvos no banco:', payload);
  } catch (err) {
    console.error('❌ Erro ao processar mensagem MQTT:', err);
  }
});
