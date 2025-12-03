import React, { useState, useEffect } from 'react';
import { RefreshCw, Droplets, AlertTriangle, Sprout } from 'lucide-react';
import Botao from '../components/Botao.jsx'

import { enderecoServidor } from '../utils/utils.jsx';

export default function TesteDiag() {
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('--/--/---- --:--');

  const [umidadeSolo, setUmidadeSolo] = useState("--")
  const [condicaoSolo, setCondicaoSolo] = useState("--")

  const [componentes, setComponentes] = useState([
    // { nome: 'Sensor Temperatura/Umidade', status: 'inativo', hora: '--' },
    { nome: 'Sistema de Irrigação', status: 'inativo', hora: '--' },
    { nome: 'Sensor Umidade do Solo', status: 'inativo', hora: '--' }
  ]);

  const [alertas, setAlertas] = useState([]);

  const buscarStatus = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/mqtt`);
      const dados = await resposta.json();
      setUmidadeSolo(dados.umidadeSolo);
      setCondicaoSolo(dados.condicaoSolo);

      const statusBomba = dados.statusReleBomba;   // <= vem do TOPICO_STATUS_RELE_BOMBA
      const agora = new Date();
      const horaFormatada = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

      // transformar LIGADO/DESLIGADO em “ativo/inativo”
      const novoStatus =
        statusBomba === "LIGADO"
          ? "ativo"
          : "inativo";

      // atualizar componente no frontend
      setComponentes(anterior =>
        anterior.map(comp =>
          comp.nome === "Sistema de Irrigação"
            ? { ...comp, status: novoStatus, hora: horaFormatada }
            : comp
        )
      );

      atualizarHora()


    } catch (error) {
      console.error("erro ao buscar status", error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      // Seu código aqui
      buscarStatus();
    }, 2000);
  }, []);

  const atualizarHora = () => {
    const agora = new Date();
    const formatado = `${String(agora.getDate()).padStart(2, '0')}/${String(agora.getMonth() + 1).padStart(2, '0')}/${agora.getFullYear()} ${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
    setUltimaAtualizacao(formatado);
  };


  // const verificarTemperatura = (temp) => {
  //   if (temp > 30) {
  //     adicionarAlerta('erro', `Temperatura muito alta: ${temp.toFixed(1)}°C (ideal: 18-25°C)`);
  //   } else if (temp < 15) {
  //     adicionarAlerta('aviso', `Temperatura baixa: ${temp.toFixed(1)}°C (ideal: 18-25°C)`);
  //   } else {
  //     removerAlerta('Temperatura');
  //   }
  // };

  // const verificarUmidade = (umidade) => {
  //   if (umidade < 60) {
  //     adicionarAlerta('aviso', `Umidade do ar baixa: ${umidade.toFixed(1)}% (ideal: 60-80%)`);
  //   } else if (umidade > 85) {
  //     adicionarAlerta('aviso', `Umidade do ar alta: ${umidade.toFixed(1)}% (ideal: 60-80%)`);
  //   } else {
  //     removerAlerta('Umidade do ar');
  //   }
  // };

  const verificarUmidadeSolo = (umidade) => {
    if (umidade < 30) {
      adicionarAlerta('erro', `Solo muito seco: ${umidade.toFixed(1)}% - Irrigação necessária`);
    } else if (umidade < 50) {
      adicionarAlerta('aviso', `Umidade do solo baixa: ${umidade.toFixed(1)}%`);
    } else {
      removerAlerta('Solo');
    }
  };

  const adicionarAlerta = (tipo, mensagem) => {
    setAlertas(anterior => {
      const palavraChave = mensagem.split(':')[0];
      const existe = anterior.some(alerta => alerta.mensagem.includes(palavraChave));

      if (existe) {
        return anterior.map(alerta =>
          alerta.mensagem.includes(palavraChave)
            ? { tipo, mensagem }
            : alerta
        );
      }
      return [...anterior, { tipo, mensagem }];
    });
  };

  const removerAlerta = (palavraChave) => {
    setAlertas(anterior => anterior.filter(alerta => !alerta.mensagem.includes(palavraChave)));
  };

  const atualizar = () => {
    // publicar(TOPICO_STATUS, 'request_update');
    atualizarHora();
  };

  const corStatus = (status) => {
    if (status === 'ativo') return 'bg-green-500';
    if (status === 'aviso') return 'bg-yellow-400';
    if (status === 'inativo') return 'bg-red-500';
    return 'bg-gray-400';
  };

  const textoStatus = (status) => {
    if (status === 'ativo') return 'Ativo';
    if (status === 'aviso') return 'Atenção';
    if (status === 'inativo') return 'Inativo';
    return 'Desconhecido';
  };

  const statusGeral = () => {
    const temErro = alertas.some(a => a.tipo === 'erro');
    const temAviso = alertas.some(a => a.tipo === 'aviso');

    if (temErro) return { texto: 'ALERTA', cor: 'text-red-600', fundo: 'bg-red-50' };
    if (temAviso) return { texto: 'ATENÇÃO', cor: 'text-yellow-600', fundo: 'bg-yellow-50' };
    return { texto: 'NORMAL', cor: 'text-green-600', fundo: 'bg-green-50' };
  };

  const situacao = statusGeral();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="text-sm text-gray-600 mb-2 font-medium">DIAGNÓSTICO DO SISTEMA</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Estufa Morango</h1>
          <div className="text-sm text-gray-500 mb-4">
            Última Verificação: {ultimaAtualizacao}
          </div>
          {/* <button
            onClick={atualizar}
            className="w-full md:w-auto !text-white font-semibold py-3 px-6 rounded border-2 border-[#7ccf00] transition-colors flex items-center justify-center gap-2"
            style={{backgroundColor: "oklch(64.8% 0.2 131.684)"}}
          >
            <RefreshCw className="w-5 h-5 text-white" />
            ATUALIZAR DIAGNÓSTICO
          </button> */}
          <div className="md:w-1/3">
          <Botao type="button" tipo="verde" height="50px" onClick={atualizar} className="md:w-1/3">
              <RefreshCw className="w-5 h-5 text-white" />
              ATUALIZAR DIAGNÓSTICO
            </Botao>
          </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Geral */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">STATUS GERAL</h2>

            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-4 rounded-xl ${situacao.fundo}`}>
                <div className={`${corStatus(alertas.length > 0 ? 'aviso' : 'ativo')} rounded-full p-2`}>
                  {alertas.length === 0 ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${situacao.cor}`}>{situacao.texto}</div>
                  <div className="text-sm text-gray-600">
                    {alertas.length === 0 ? 'Sistema funcionando normalmente' : `${alertas.length} alerta(s)`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
               {/* <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-xs text-gray-600 mb-1">Temperatura</div>
                  <div className="text-xl font-bold text-gray-800">
                    {temperatura !== '--' ? `${temperatura}°C` : '--'}
                  </div>
                </div> */}

              {/* <div className="text-center p-4 bg-cyan-50 rounded-xl">
                  <Droplets className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                  <div className="text-xs text-gray-600 mb-1">Umidade Ar</div>
                  <div className="text-xl font-bold text-gray-800">
                    {umidade !== '--' ? `${umidade}%` : '--'}
                  </div>
                </div> */}

              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <Sprout className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                <div className="text-xs text-gray-600 mb-1">Umidade Solo</div>
                <div className="text-xl font-bold text-gray-800">
                  {umidadeSolo !== '--' ? `${umidadeSolo}%` : '--'}
                </div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Droplets className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-xs text-gray-600 mb-1">Condição Solo</div>
                <div className="text-sm font-bold text-gray-800">
                  {condicaoSolo !== '--' ? `${condicaoSolo}` : '--'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Componentes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">COMPONENTES</h2>

          <div className="space-y-3">
            {/* listar os componentes sensores e atuadores */}
            {componentes.map((componente, indice) => (
              <div key={indice} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${corStatus(componente.status)}`}></div>
                  <div className="font-medium text-gray-700">{componente.nome}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-600">{textoStatus(componente.status)}</span>
                  <span className="text-xs text-gray-400 hidden md:block">{componente.hora}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">ALERTAS</h2>

        {alertas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">Nenhum alerta ativo</p>
            <p className="text-sm">Sistema funcionando normalmente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alertas.map((alerta, indice) => (
              <div
                key={indice}
                className={`flex items-start gap-3 p-4 rounded-xl ${alerta.tipo === 'erro' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}
              >
                <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${alerta.tipo === 'erro' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                <p className="text-gray-700 font-medium">{alerta.mensagem}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}