import React, { useEffect, useState } from "react";
import { enderecoServidor } from "../utils/utils";

export default function ControleInteligente() {
  // modo: "AUTOMATICO" | "MANUAL"
  const [modo, setModo] = useState("AUTOMATICO");
  // estado vindo do backend/ESP: "LIGADO" | "DESLIGADO" | null/"--"
  const [statusRele, setStatusRele] = useState("--");
  // sensor
  const [umidadeSolo, setUmidadeSolo] = useState("--");
  const [condicaoSolo, setCondicaoSolo] = useState("--");
  // travamento UX: true enquanto aguardamos confirmação do ESP
  const [travado, setTravado] = useState(false);

  // ------------------------------------------------
  // buscar status do backend (/mqtt)
  // ------------------------------------------------
  const buscarStatus = async () => {
    try {
      const res = await fetch(`${enderecoServidor}/mqtt`);
      const dados = await res.json();
      // atualiza dados sensoriais sempre
      setUmidadeSolo(dados.umidadeSolo ?? "--");
      setCondicaoSolo(dados.condicaoSolo ?? "--");

      // atualiza status do relé (fonte da verdade)
      if (dados.statusReleBomba) {
        setStatusRele(dados.statusReleBomba);
      }

      // tambem atualiza o modo (caso o backend esteja informando isso)
      if (dados.modoIrrigacao) {
        setModo(dados.modoIrrigacao);
      }
    } catch (err) {
      console.error("Erro ao buscar status:", err);
    }
  };

  useEffect(() => {
    // busca inicial e polling
    buscarStatus();
    const interval = setInterval(buscarStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------------
  // envia modo (AUTOMATICO / MANUAL) ao backend
  // ------------------------------------------------
  const toggleModo = async () => {
    const novoModo = modo === "MANUAL" ? "AUTOMATICO" : "MANUAL";
    // atualiza visual imediatamente
    setModo(novoModo);

    try {
      await fetch(`${enderecoServidor}/controle/modo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo: novoModo }),
      });
    } catch (err) {
      console.error("Erro ao enviar modo:", err);
      // em caso de erro, reverte visual (opcional)
      setModo(modo);
      return;
    }

    setTimeout(buscarStatus, 1000);
  };

  // ------------------------------------------------
  // toggle manual: envia ON/OFF, mas o estado visual é controlado apenas por `statusRele`
  // ------------------------------------------------
  const handleToggleManual = async () => {
    if (travado) return; // evita spam/cliques múltiplos

    // fonte: statusRele === "LIGADO"
    const ligadoAgora = statusRele === "LIGADO";
    const novoComando = ligadoAgora ? "OFF" : "ON";

    // trava UI
    setTravado(true);

    try {
      await fetch(`${enderecoServidor}/controle/comando`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comando: novoComando }),
      });

      // aguarda ESP processar e publicar novo status
      // timeout alinhado com o loop do ESP (3s) e propagação
      setTimeout(() => {
        buscarStatus();
        setTravado(false);
      }, 2500);
    } catch (err) {
      console.error("Erro ao enviar comando manual:", err);
      setTravado(false);
    }
  };

  // ------------------------------------------------
  // toggle visual: derivado do statusRele
  // ------------------------------------------------
  const toggleLigado = statusRele === "LIGADO";

  function Toggle({ checked, onChange, disabled }) {
    return (
      <button
        aria-pressed={checked}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onChange}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition
          ${checked ? "bg-lime-400" : "bg-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-5 w-5 bg-white rounded-full transform transition
            ${checked ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Controle Inteligente</h1>

        {/* MODO AUTO / MANUAL */}
        <section className="p-4 bg-gray-50 rounded-lg border mb-6">
          <h2 className="text-lg font-medium">Modo de Irrigação</h2>

          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-500">Automático</span>
            <Toggle checked={modo === "MANUAL"} onChange={toggleModo} disabled={false} />
            <span className="text-sm text-gray-500">Manual</span>
          </div>
        </section>

        {/* CONTROLE MANUAL (visível somente em MANUAL) */}
        {modo === "MANUAL" && (
          <section className="p-4 bg-gray-50 rounded-lg border mb-6">
            <h2 className="text-lg font-medium">Controle Manual</h2>

            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-500">Desligado</span>

              <Toggle checked={toggleLigado} onChange={handleToggleManual} disabled={travado} />

              <span className="text-sm text-gray-500">Ligado</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Status atual do relé: <b>{statusRele}</b>
            </p>

            {travado && (
              <p className="text-xs text-orange-600 mt-2 font-medium">⏳ Aguardando resposta da bomba...</p>
            )}
          </section>
        )}

        {/* DADOS DO SENSOR */}
        <section className="p-4 bg-gray-50 rounded-lg border mb-6">
          <h2 className="text-lg font-medium">Status do Sistema</h2>

          <p className="text-sm mt-3">
            <b>Umidade do Solo:</b> {umidadeSolo}
          </p>
          <p className="text-sm">
            <b>Condição do Solo:</b> {condicaoSolo}
          </p>
        </section>
      </div>
    </div>
  );
}
