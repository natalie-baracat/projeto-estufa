import React, { useEffect, useState } from "react";
import { enderecoServidor } from "../utils/utils";

export default function ControleInteligente() {
  const [modo, setModo] = useState("AUTOMATICO");
  const [comandoManual, setComandoManual] = useState("OFF");
  const [statusRele, setStatusRele] = useState("--");

  // Dados do backend
  const [umidadeSolo, setUmidadeSolo] = useState("--");
  const [condicaoSolo, setCondicaoSolo] = useState("--");

  // ✅ NOVO: Flag para evitar sobrescrever durante edição
  const [editandoComando, setEditandoComando] = useState(false);

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

      // ✅ SÓ SINCRONIZA SE NÃO ESTIVER EDITANDO
      if (modo === "MANUAL" && !editandoComando) {
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
  }, [modo, editandoComando]); // ✅ Adiciona editandoComando como dependência

  // ------------------------------------------
  // SALVAR CONFIGURAÇÕES
  // ------------------------------------------
  const salvar = async () => {
    try {
      // 1 – Envia o modo
      await fetch(`${enderecoServidor}/controle/modo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modo })
      });

      // 2 – Se manual, envia ON/OFF
      if (modo === "MANUAL") {
        await fetch(`${enderecoServidor}/controle/comando`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comando: comandoManual })
        });
      }

      alert("Configurações salvas!");
      
      // ✅ Libera a edição após salvar
      setEditandoComando(false);
      
      // ✅ Aguarda um pouco e busca o status atualizado
      setTimeout(buscarStatus, 2500);

    } catch (err) {
      console.error("Erro ao salvar configurações:", err);
      alert("Erro ao salvar.");
      setEditandoComando(false);
    }
  };

// ✔ NOVA FUNÇÃO: Handler do toggle manual - ENVIA COMANDO IMEDIATAMENTE
const handleToggleManual = async () => {
  const novoComando = comandoManual === "ON" ? "OFF" : "ON";
  setEditandoComando(true);
  setComandoManual(novoComando);
  

  try {
    // Envia o comando imediatamente ao backend
    await fetch(`${enderecoServidor}/controle/comando`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comando: novoComando })
    });

    console.log(`Comando ${novoComando} enviado com sucesso`);
    
    // Aguarda um pouco e busca o status atualizado
    setTimeout(() => {
      buscarStatus();
      setEditandoComando(false);
    }, 500);

  } catch (err) {
    console.error("Erro ao enviar comando manual:", err);
    alert("Erro ao enviar comando.");
    setEditandoComando(false);
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
              onChange={() => {
                setModo(modo === "MANUAL" ? "AUTOMATICO" : "MANUAL");
                setEditandoComando(false);
              }}
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
                onChange={handleToggleManual}
              />
              <span className="text-sm text-gray-500">Ligado</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Status atual do relé: <b>{statusRele}</b>
            </p>
            
            {/* ✅ INDICADOR VISUAL DE MUDANÇA NÃO SALVA */}
            {editandoComando && (
              <p className="text-xs text-orange-600 mt-2 font-medium">
                ⚠️ Clique em "Salvar Configurações" para aplicar
              </p>
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

        {/* BOTÃO SALVAR */}
        <button
          onClick={salvar}
          className={`w-full py-3 rounded-lg shadow-md font-semibold transition ${
            editandoComando 
              ? "bg-orange-600 text-white animate-pulse" 
              : "bg-lime-600 text-white"
          }`}
        >
          {editandoComando ? "⚠️ Salvar Alterações" : "Salvar Configurações"}
        </button>
      </div>
    </div>
  );
}