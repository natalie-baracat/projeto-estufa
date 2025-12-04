import React, { useState, useEffect } from "react";
// import { EditarPlantio } from '../components/ModalEditarPlantio';
import { 
  MdLocationOn, MdCalendarToday, MdLocalFlorist, MdEdit, MdNaturePeople, MdAccessTime, 
  MdAgriculture, MdTerrain, MdInvertColors, MdLocalFlorist as MdFertilizer,
  MdExpandMore, MdExpandLess
} from 'react-icons/md';
import {FaSeedling} from "react-icons/fa"
import {Search, Filter } from 'lucide-react'
import NovoPlantio from "./NovoPlantio";
import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";
import { useParams } from 'react-router-dom';  // Importando useParams

export default function MonitoramentoPlantio() {
  const [plantio, setPlantio] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [expandido, setExpandido] = useState(null);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [idCultivoSelecionado, setIdCultivoSelecionado] = useState(null);


  useEffect(() => {
  async function buscarPlantio() {
    try {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`http://localhost:3000/cultivos/`, {  // Buscando o plantio pelo ID
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!resposta.ok) {
        throw new Error('Falha ao carregar o plantio');
      }

      const dados = await resposta.json();
      setPlantio(dados);
    } catch (erro) {
      console.error("Erro ao carregar o plantio:", erro);
    }
  }

  buscarPlantio();
}, []);  // Recarrega os dados quando o ID mudar

const abrirModal = (id_cultivo) => {
    setIdCultivoSelecionado(id_cultivo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setIdCultivoSelecionado(null);
  };

  const handleSucesso = () => {
    // Recarregue sua lista de plantios aqui
    buscarPlantios();
  };


  const plantiosFiltrados = plantio.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (filtro === "" || u.local?.toLowerCase().includes(filtro.toLowerCase()))
  );

  function toggleExpandir(id) {
    console.log('Clicou no ID:', id);
    console.log('Expandido atual:', expandido);
    setExpandido(prev => {
      const novoValor = prev === id ? null : id;
      console.log('Novo valor:', novoValor);
      return novoValor;
    });
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-green-600 rounded-2xl shadow-lg">
          <FaSeedling className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-green-800">Monitoramento do Plantio</h1>
      </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar plantios..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-white border-2 border-lime-200 rounded-xl py-3 pl-12 pr-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime-600" />
          </div>

          <div className="relative">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full border-2 border-lime-200 rounded-xl py-3 px-4 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">📋 Todos os locais</option>
              <option value="Estufa">🌱 Estufa</option>
              <option value="Campo aberto">🟩 Campo aberto</option>
            </select>
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime-600 pointer-events-none" />
          </div>
        </div>

      <p className="text-xl font-medium my-4">Plantios:</p>

      {/* Grid/Flexbox */}
      <div className="flex flex-wrap gap-3 mt-6 w-full">
        {plantiosFiltrados.length > 0 ? (
          plantiosFiltrados.map((p) => {
            const estaExpandido = expandido === p.id_cultivo;
            
            return (
              <div
                key={p.id_cultivo}
                className={`
                  bg-white rounded-xl shadow-lg border border-lime-100 overflow-hidden 
                  transition-all duration-500
                  ${estaExpandido ? 'w-full lg:w-2/3' : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'}
                `}
              >
                {/* Cabeçalho do Card - sempre visível */}
                <div 
                  onClick={() => toggleExpandir(p.id_cultivo)}
                  className="cursor-pointer hover:bg-lime-50 transition-colors"
                >
                  <div className="relative h-40">
                    <img
                      src={p.img_cultivo}
                      alt={p.nome}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 rounded-full p-2 shadow-lg">
                      {estaExpandido ? (
                        <MdExpandLess className="text-lime-600 text-2xl" />
                      ) : (
                        <MdExpandMore className="text-lime-600 text-2xl" />
                      )}
                    </div>
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-lime-800">{p.nome}</h3>
                    {!estaExpandido && (
                      <p className="text-sm text-gray-500 mt-1">
                        Clique para ver detalhes
                      </p>
                    )}
                  </div>
                </div>

                {/* Conteúdo expandido */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    estaExpandido ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-lime-200 pt-4">
                      
                      {/* Grid de informações */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        
                        {/* Área do Cultivo */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdLocationOn className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Área do Cultivo</p>
                            <p className="text-gray-800 font-semibold">{p.area_plantio}</p>
                          </div>
                        </div>

                        {/* Data de Início */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdCalendarToday className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Data de Início</p>
                            <p className="text-gray-800 font-semibold">{p.data_criacao}</p>
                          </div>
                        </div>

                        {/* Espécie */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdLocalFlorist className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Espécie</p>
                            <p className="text-gray-800 font-semibold">{p.variedade}</p>
                          </div>
                        </div>

                        {/* Estágio Atual */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdNaturePeople className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Estágio Atual</p>
                            <p className="text-gray-800 font-semibold">{p.estagio_atual}</p>
                          </div>
                        </div>

                        {/* Tempo de Ciclo */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdAccessTime className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Tempo de Ciclo</p>
                            <p className="text-gray-800 font-semibold">{p.dias_ciclo} dias</p>
                          </div>
                        </div>

                        {/* Tipo de Cultivo */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdAgriculture className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Tipo de Cultivo</p>
                            <p className="text-gray-800 font-semibold">{p.tipo_local}</p>
                          </div>
                        </div>

                        {/* Tipo de Solo */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdTerrain className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Tipo de Solo</p>
                            <p className="text-gray-800 font-semibold">{p.tipo_solo}</p>
                          </div>
                        </div>

                        {/* Substrato */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdInvertColors className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Substrato</p>
                            <p className="text-gray-800 font-semibold">{p.substrato}</p>
                          </div>
                        </div>

                        {/* Adubação */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <MdFertilizer className="text-lime-600 text-xl flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Adubação</p>
                            <p className="text-gray-800 font-semibold">{p.adubacao}</p>
                          </div>
                        </div>

                      </div>

                      {/* Descrição */}
                      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lime-600 font-semibold mb-2 flex items-center gap-2">
                          <MdLocalFlorist />
                          Descrição
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{p.descricao}</p>
                      </div>

                      {/* Botão Editar */}
                      <div className="mt-6">
                      <Botao onClick={() => abrirModal(plantio.id_cultivo)} tipo="verde" width="200px" height="50px">
                        <MdEdit className="text-xl" />
                        Editar Plantio
                      </Botao>

                      {/* Modal */}
                        <ModalEditarPlantio
                          isOpen={modalAberto}
                          onClose={fecharModal}
                          id_cultivo={idCultivoSelecionado}
                          onSucesso={handleSucesso}
                        />
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <p className="w-full text-center text-gray-500">Nenhum plantio encontrado.</p>
        )}
      </div>

      {/* Botão Novo */}
      <div className="fixed right-8 bottom-8">
        <Botao onClick={() => navigate("/novoplantio")} tipo="verde" width="200px" height="50px">
          <MdEdit className="text-xl" />
          + Novo
        </Botao>
        
      </div>
    </div>
  );
}