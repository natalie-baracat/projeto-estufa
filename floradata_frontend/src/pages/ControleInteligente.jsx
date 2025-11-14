import React, { useEffect, useState } from "react";
import { enderecoServidor } from "../utils/utils.jsx";

export default function ControleInteligente() {
  const [modo, setModo] = useState("AUTOMATICO");
  const [comandoManual, setComandoManual] = useState("OFF");
  const [statusRele, setStatusRele] = useState("--");

  // Dados do backend
  const [umidadeSolo, setUmidadeSolo] = useState("--");
  const [condicaoSolo, setCondicaoSolo] = useState("--");

  // ------------------------------------------
  // BUSCAR STATUS ATUAL (/mqtt)
  // ------------------------------------------
  const buscarStatus = async () => {
    try {
      const res = await fetch(`${enderecoServidor}/mqtt`);
      const dados = await res.json();

      setUmidadeSolo(dados.umidadeSolo);
      setCondicaoSolo(dados.condicaoSolo);
      setStatusRele(dados.statusReleBomba);

      // Se está DESLIGADO/LIGADO, sincroniza o botão manual
      if (modo === "MANUAL") {
        setComandoManual(dados.statusReleBomba === "LIGADO" ? "ON" : "OFF");
      }

    } catch (err) {
      console.error("Erro ao buscar status:", err);
    }
  };

  useEffect(() => {
    buscarStatus();
    const interval = setInterval(buscarStatus, 2000);
    return () => clearInterval(interval);
  }, [modo]);

  // ------------------------------------------
  // SALVAR CONFIGURAÇÕES
  // ------------------------------------------
  const salvar = async () => {
    try {
      // 1 — Envia o modo
      await fetch(`${enderecoServidor}/controle/modo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo })
      });

      // 2 — Se manual, envia ON/OFF
      if (modo === "MANUAL") {
        await fetch(`${enderecoServidor}/controle/comando`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comando: comandoManual })
        });
      }

      alert("Configurações salvas!");

    } catch (err) {
      console.error("Erro ao salvar configurações:", err);
      alert("Erro ao salvar.");
    }
  };

  // ------------------------------------------
  // COMPONENTE TOGGLE
  // ------------------------------------------
  function Toggle({ checked, onChange }) {
    return (
      <button
        onClick={onChange}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition ${
          checked ? "bg-lime-400" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 bg-white rounded-full transform transition ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-100">

        <h1 className="text-2xl font-semibold mb-4">Controle Inteligente</h1>

        {/* MODE AUTO/MANUAL */}
        <section className="p-4 bg-gray-50 rounded-lg border mb-6">
          <h2 className="text-lg font-medium">Modo de Irrigação</h2>

          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-500">Automático</span>
            <Toggle
              checked={modo === "MANUAL"}
              onChange={() => setModo(modo === "MANUAL" ? "AUTOMATICO" : "MANUAL")}
            />
            <span className="text-sm text-gray-500">Manual</span>
          </div>
        </section>

        {/* COMANDO MANUAL ON/OFF */}
        {modo === "MANUAL" && (
          <section className="p-4 bg-gray-50 rounded-lg border mb-6">
            <h2 className="text-lg font-medium">Controle Manual</h2>

            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-500">Desligado</span>
              <Toggle
                checked={comandoManual === "ON"}
                onChange={() =>
                  setComandoManual(comandoManual === "ON" ? "OFF" : "ON")
                }
              />
              <span className="text-sm text-gray-500">Ligado</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Status atual do relé: <b>{statusRele}</b>
            </p>
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

        {/* BOTÃO SALVAR */}
        <button
          onClick={salvar}
          className="w-full bg-lime-600 text-white py-3 rounded-lg shadow-md font-semibold"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
