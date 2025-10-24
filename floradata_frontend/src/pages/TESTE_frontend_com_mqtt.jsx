/* 
    esse código foi desenvolvido pra testar o acionamento/desligamento de um periférico por meio do MQTT

    a ideia é:
        - O usuário aperta o botão no site.

        - O frontend publica a mensagem no tópico MQTT correspondente.

        - O broker MQTT distribui a mensagem para todos os inscritos.

        - O ESP32, inscrito no tópico, recebe a mensagem e aciona o relé.

        - O relé liga ou desliga o periférico em tempo real.

*/

import mqtt from 'mqtt';
import { useState } from 'react';

const client = mqtt.connect('wss://broker.mqtt.com'); // broker WebSocket

export default function Periferico({ nome, topico }) {
  const [estado, setEstado] = useState('off');

  const toggle = () => {
    const novoEstado = estado === 'off' ? 'on' : 'off';
    client.publish(topico, JSON.stringify({ status: novoEstado }));
    setEstado(novoEstado);
  }

  return (
    <div>
      <p>{nome}: {estado.toUpperCase()}</p>
      <button onClick={toggle}>{estado === 'off' ? 'Ligar' : 'Desligar'}</button>
    </div>
  );
}
