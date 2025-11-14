import React, { useState } from 'react';
// import '../components/Login.css'
import '../styles/Login.css'
import Estilos from '../styles/Estilos';
import Layout from '../components/Layout';

// --- Dados de Alerta de Exemplo (Integrados) ---
const DADOS_ALERTAS = [
  {
    id: 1,
    nivel: "Critico",
    titulo: "Falha Crítica no Sensor de Umidade",
    mensagem: "O sensor da Morango - Estufa 2 parou de enviar dados. Necessário reparo imediato.",
    planta: "Morango - Estufa 2",
    hora: "2 min atrás",
  },
  {
    id: 2,
    nivel: "Aviso",
    titulo: "Temperatura Acima do Limite",
    mensagem: "A temperatura ambiente ultrapassou 30°C. Considerar acionar ventilação extra.",
    planta: "Milho - Lote B",
    hora: "15 min atrás",
  },
  {
    id: 3,
    nivel: "Info",
    titulo: "Ciclo de Irrigação Concluído",
    mensagem: "O ciclo automático de irrigação da Alface foi finalizado com sucesso.",
    planta: "Alface",
    hora: "1 hora atrás",
  },
  {
    id: 4,
    nivel: "Critico",
    titulo: "Nível de Água Baixo",
    mensagem: "O reservatório principal atingiu o nível crítico. Reabastecimento urgente necessário.",
    planta: "Sistema Geral",
    hora: "3 horas atrás",
  },
  {
    id: 5,
    nivel: "Aviso",
    titulo: "PH do Solo em Variação",
    mensagem: "Detectada ligeira acidificação do solo na área do Tomate. Monitorar.",
    planta: "Tomate Cereja",
    hora: "1 dia atrás",
  },
  {
    id: 6,
    nivel: "Info",
    titulo: "Novo Lote de Cenoura Adicionado",
    mensagem: "As sementes de Cenoura foram registradas no sistema de monitoramento.",
    planta: "Cenoura",
    hora: "1 dia atrás",
  },
  {
    id: 7,
    nivel: "Critico",
    titulo: "Comunicação Perdida com Gateway",
    mensagem: "O dispositivo de comunicação da estufa principal está offline.",
    planta: "Estufa Principal",
    hora: "2 dias atrás",
  },
];

// Função utilitária para obter classes e ícones baseados no nível
const getAlertaClasses = (nivel) => {
  switch (nivel) {
    case 'Critico':
      return { 
        bg: 'bg-red-50 hover:bg-red-100 border-red-500', 
        text: 'text-red-800', 
        icon: '🚨' 
      };
    case 'Aviso':
      return { 
        bg: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-500', 
        text: 'text-yellow-800', 
        icon: '⚠️' 
      };
    case 'Info':
      return { 
        bg: 'bg-blue-50 hover:bg-blue-100 border-blue-500', 
        text: 'text-blue-800', 
        icon: '🔔' 
      };
    default:
      return { 
        bg: 'bg-gray-50 hover:bg-gray-100 border-gray-400', 
        text: 'text-gray-700', 
        icon: 'ℹ️' 
      };
  }
};

export default function PaginaAlertas() {
  const [alertas, setAlertas] = useState(DADOS_ALERTAS);
  const [mostrarTodos, setMostrarTodos] = useState(false); 
  
  // Limita o número de alertas visíveis por padrão, se houver muitos
  const limitePadrao = 8;
  const alertasExibidos = mostrarTodos ? alertas : alertas.slice(0, limitePadrao); 

  // Use <Layout> se ele existir e for necessário. Se não, use apenas o <div>
  return (
    <div> 
      {/* Container Principal da Página: Fundo, altura mínima e largura máxima */}
      <div className="min-h-screen">
        
        {/* Cabeçalho da Página (Fixo no topo e responsivo) */}
        <header className="py-6 border-b border-lime-100 sticky top-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-lime-800 flex items-center">
                ⚠️ Central de Alertas ({alertas.length})
            </h1>
            <p className="mt-1 text-sm text-gray-500">
                Visualize e gerencie todos os eventos críticos e avisos do sistema.
            </p>
          </div>
        </header>

        {/* Conteúdo Principal (Container de Alertas) */}
        <main className="py-8 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          
          {/* Grid Responsivo de Alertas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"> 
            
            {alertasExibidos.map((alerta) => {
              const { bg, text, icon } = getAlertaClasses(alerta.nivel);

              return (
                <div 
                  key={alerta.id} 
                  // Estilos: Borda esquerda para cor, sombra, transição
                  className={`p-4 border-l-4 rounded-lg shadow-md transition-all duration-300 cursor-pointer ${bg} hover:shadow-lg`}
                  onClick={() => alert(`Visualizar detalhes do Alerta ID: ${alerta.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    {/* Ícone e Nível do Alerta */}
                    <div className={`font-extrabold text-lg flex items-center ${text}`}>
                      <span className="mr-2 text-xl">{icon}</span>
                      {alerta.nivel.toUpperCase()}
                    </div>
                    {/* Hora do Alerta */}
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {alerta.hora}
                    </span>
                  </div>

                  {/* Título e Mensagem */}
                  <h3 className={`text-base font-semibold ${text} mb-1 truncate`}>
                    {alerta.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {alerta.mensagem}
                  </p>

                  {/* Planta Relacionada */}
                  <p className="text-xs font-semibold text-gray-500 mt-2 p-1 bg-white rounded-md inline-block shadow-inner">
                    🌱 {alerta.planta}
                  </p>
                </div>
              );
            })}
            
            {/* Mensagem de Alertas Vazios */}
            {alertas.length === 0 && (
                <div className="col-span-full bg-green-50 p-6 rounded-lg border-2 border-green-300 text-center">
                    <p className="text-xl font-bold text-green-800">✅ Tudo Certo!</p>
                    <p className="text-green-600 mt-1">Não há alertas críticos ou pendentes no momento.</p>
                </div>
            )}
          </div>
          
          {/* Botão de "Ver Mais" */}
          {alertas.length > limitePadrao && (
            <div className="w-full text-center mt-10">
              <button 
                onClick={() => setMostrarTodos(!mostrarTodos)}
                className="px-8 py-3 border-2 border-lime-500 text-lime-700 font-bold rounded-lg bg-white shadow-md hover:bg-lime-50 transition duration-300"
              >
                {mostrarTodos 
                  ? 'Recolher Alertas (Mostrar Menos)' 
                  : `Ver Todos os ${alertas.length} Alertas Pendentes ❯`
                }
              </button>
            </div>
          )}

        </main>
        
      </div>
    </div>
  );
}