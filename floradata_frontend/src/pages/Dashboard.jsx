import React, { useContext, useState } from 'react';
// import '../components/Login.css';
import '../styles/Login.css';
import Layout from '../components/Layout';
import { UsuarioContext } from '../UsuarioContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import GraficosDash from '../components/graficosDash';

// --- Dados de Exemplo Simplificados ---
const DADOS_PLANTAS = [
  {
    id: 1,
    nome: "Morango",
    imagem: "https://semcomplicar.com.br/campoenegocios/wp-content/uploads/2016/03/Foto-01-Cr%C3%A9ditos-Frutas-Almeida.jpg",
  },
  {
    id: 2,
    nome: "Milho - Lote B",
    imagem: "https://www.embrapa.br/bme_images/o/97760040o.jpg",
  },
  {
    id: 3,
    nome: "Morango - Estufa 2",
    imagem: "https://semcomplicar.com.br/campoenegocios/wp-content/uploads/2016/03/Foto-01-Cr%C3%A9ditos-Frutas-Almeida.jpg",
  },
  {
    id: 4,
    nome: "Alface",
    imagem: "https://www.embrapa.br/bme_images/o/185080040o.jpg",
  },
  {
    id: 5,
    nome: "Tomate Cereja",
    imagem: "https://www.semadesc.ms.gov.br/wp-content/uploads/2016/12/1609_tomate_cereja_2.jpg",
  },
  {
    id: 6,
    nome: "Cenoura",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFspbojG_AEk4tP1iqu89by1xM_xQ1NPjmw&s",
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const { dadosUsuario } = useContext(UsuarioContext);

  const plantas = DADOS_PLANTAS;

  const filtradas = plantas.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // Recomenda-se envolver a dashboard em um componente de layout/estrutura
    <div>
      {/* Container Principal:
        - min-h-screen: Garante que ocupe pelo menos a altura da tela.
        - p-4: Padding em telas pequenas.
        - md:p-6 lg:py-8: Aumenta o padding em telas maiores.
        - mx-auto max-w-7xl: Centraliza o conteúdo e limita a largura máxima, crucial para responsividade.
      */}
      <div className="min-h-screen p-4 md:p-6 lg:py-8 mx-auto max-w-6xl flex flex-col items-center w-full">

        {/* Saudação (w-full para ocupar o espaço do max-w-7xl) */}
        <div className="w-full">
          <p className="text-lime-700 font-medium text-lg">🌿 Bem-vindo(a),</p>
          {/* text-5xl em telas maiores (sm) */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-lime-800 truncate">{dadosUsuario?.nome || 'Usuário'}!</h1>
          <p className="text-lime-700 mt-1 text-md font-medium">
            Você está na <span className="font-bold">Dashboard</span>
          </p>
        </div>

        {/* Mensagem Principal */}
        <div className="bg-lime-600/90 rounded-tl-4xl rounded-br-4xl shadow-md px-5 py-4 mt-4 text-center  border-[0.5px] border-lime-100 w-full">
          <p className="!text-white/90 lg:text-2xl md:text-xl font-semibold text-sm mb-1 transition">
            Acompanhe o desenvolvimento das suas plantas em tempo real!
          </p>
          <p className="!text-white/90 text-sm lg:text-xl md:text-lg opacity-90">
            Tudo em um só lugar, com praticidade, automação e inteligência.
          </p>
        </div>

        {/* Barra de Ações (Busca e Botão):
            - flex-col: Em telas pequenas, ficam empilhados (busca em cima, botão embaixo).
            - sm:flex-row: A partir do breakpoint 'sm', ficam lado a lado.
            - gap-3: Espaçamento entre os itens.
            - mt-6: Margem superior.
        */}
        <div className="w-full mt-6 flex flex-col sm:flex-row gap-3 items-center">

          {/* Campo de Busca (w-full para ocupar 100% da largura em telas pequenas e 50% em telas maiores) */}
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="🔍 Pesquisar planta por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-lime-300 rounded-lg pl-3 pr-3 py-2.5 focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm placeholder-gray-400 text-lime-800 transition"
            />
          </div>

          {/* Botão Diagnóstico (w-full para ocupar 100% da largura em telas pequenas e 50% em telas maiores) */}
          <button
            className="w-full sm:w-1/2 border-2 border-lime-500 text-white font-bold py-2.5 rounded-lg bg-lime-600 shadow-md hover:bg-lime-700 transition duration-300"
            onClick={() => alert("Navegar para Diagnóstico do Sistema")}
          >
            Acessar <span className="font-extrabold">Diagnóstico do Sistema ❯</span>
          </button>
        </div>

        {/* Cards das plantas:
            - grid-cols-2: 2 colunas em telas pequenas.
            - sm:grid-cols-3: 3 colunas em telas 'sm' (normalmente tablets).
            - lg:grid-cols-4: 4 colunas em telas 'lg' (desktops).
            - gap-6: Espaçamento entre os cards.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full">
          {filtradas.length > 0 ? (
            filtradas.map((planta) => (
              <div
                key={planta.id}
                className="bg-white rounded-xl shadow-lg border border-lime-100 overflow-hidden hover:shadow-xl hover:border-lime-300 transition-all duration-300 cursor-pointer"
              >
                {/* h-32: Altura fixa para a imagem em todas as telas */}
                <div className="relative h-32">
                  <img
                    src={planta.imagem}
                    alt={planta.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 text-center">
                  {/* text-sm: Fonte menor em telas menores, md:text-base: Aumenta em telas maiores */}
                  <h3 className="text-sm md:text-base font-bold text-lime-800 truncate">{planta.nome}</h3>
                </div>
              </div>
            ))
          ) : (
            // Mensagem de Plantas Não Encontradas (ocupa todas as colunas)
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-500 font-semibold">Nenhuma planta encontrada para "{search}".</p>
              <p className="text-gray-400 mt-2">Tente um termo de pesquisa diferente.</p>
            </div>
          )}
        </div>

          <div className="w-full mt-8">
          {/* text-5xl em telas maiores (sm) */}
          <h1 className="text-4xl sm:text-5xl font-bold !text-lime-800 truncate">Visualização rápida</h1>
        <GraficosDash />
        </div>

      </div>
    </div>
  );
}