import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Estilos from "../styles/Estilos";
import Botao from "../components/Botao";

export default function ConfiguracoesAutomacao() {
  const { id } = useParams();
  const [cultivo, setCultivo] = useState(null);

  // Estados para configurações
  const [temperatura, setTemperatura] = useState("");
  const [umidade, setUmidade] = useState("");
  const [luz, setLuz] = useState("");

  const [irrigacaoAuto, setIrrigacaoAuto] = useState(false);
  const [luzAuto, setLuzAuto] = useState(false);
  const [ventilacaoAuto, setVentilacaoAuto] = useState(false);

  const [horarioIrrigacao, setHorarioIrrigacao] = useState("");
  const [tempoIluminacao, setTempoIluminacao] = useState("");

  const [limiteUmidade, setLimiteUmidade] = useState("");

  const [notificacao, setNotificacao] = useState(false);

  // Carregar cultivo específico
  useEffect(() => {
    async function buscarCultivo() {
      try {
        const resposta = await fetch(`http://localhost:3000/cultivos/${id}`);
        const dados = await resposta.json();
        setCultivo(dados);
      } catch (erro) {
        console.error("Erro ao buscar cultivo:", erro);
      }
    }

    buscarCultivo();
  }, [id]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className={Estilos.titulo}>
        Configurações de Automação – {cultivo?.nome}
      </h1>

      {/* PARÂMETROS IDEAIS */}
      <section className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Parâmetros Ideais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Temperatura ideal (°C)"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Umidade ideal (%)"
            value={umidade}
            onChange={(e) => setUmidade(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Luz ideal (horas)"
            value={luz}
            onChange={(e) => setLuz(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </section>

      {/* AUTOMAÇÃO */}
      <section className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Automação
        </h2>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={irrigacaoAuto}
            onChange={(e) => setIrrigacaoAuto(e.target.checked)}
          />
          Irrigação Automática
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={luzAuto}
            onChange={(e) => setLuzAuto(e.target.checked)}
          />
          Luz Artificial Automática
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ventilacaoAuto}
            onChange={(e) => setVentilacaoAuto(e.target.checked)}
          />
          Ventilação Automática
        </label>
      </section>

      {/* HORÁRIOS */}
      <section className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Horários e Temporizadores
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="time"
            value={horarioIrrigacao}
            onChange={(e) => setHorarioIrrigacao(e.target.value)}
            className="border p-2 rounded"
            placeholder="Horário de irrigação"
          />

          <input
            type="number"
            value={tempoIluminacao}
            onChange={(e) => setTempoIluminacao(e.target.value)}
            placeholder="Tempo de iluminação (horas)"
            className="border p-2 rounded"
          />
        </div>
      </section>

      {/* LIMITES */}
      <section className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Limites para Alertas
        </h2>

        <input
          type="number"
          value={limiteUmidade}
          onChange={(e) => setLimiteUmidade(e.target.value)}
          placeholder="Alertar se umidade estiver abaixo de (%)"
          className="border p-2 rounded"
        />
      </section>

      {/* NOTIFICAÇÕES */}
      <section className="mt-8 mb-4 bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Notificações
        </h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notificacao}
            onChange={(e) => setNotificacao(e.target.checked)}
          />
          Ativar notificações automáticas
        </label>
      </section>

      <Botao type="submit" tipo="verde" width="210px" height="48px">
        Salvar Configurações
      </Botao>
    </div>
  );
}
