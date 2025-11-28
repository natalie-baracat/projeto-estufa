import { useNavigate } from "react-router-dom";
import "../styles/CadastroPlantios.css"
import React, { useState, useEffect } from "react";
import Botao from '../components/Botao.jsx';
import ModalPlantio from '../components/modalPlantio.jsx';

export default function MonitoramentoPlantio() {
  const navigate = useNavigate();
  const [plantio, setPlantio] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [plantioSelecionado, setPlantioSelecionado] = useState(null);

  const [erro, setErro] = useState(null);

useEffect(() => {
    async function buscarPlantio() {
      try {
        const token = localStorage.getItem('token'); // Obter o token do localStorage

        if (!token) {
          throw new Error('Token não encontrado, por favor faça login novamente.');
        }

        // Realiza a requisição para buscar os plantios, incluindo o token no cabeçalho
        const resposta = await fetch("http://localhost:3000/cultivos", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,},
        });

        if (!resposta.ok) {
          throw new Error('Falha ao carregar os plantios');
        }

        const dados = await resposta.json();
        setPlantio(dados);
      } catch (erro) {
        console.error("Erro ao carregar plantios:", erro);
        setErro(erro.message);
      }
    }

    buscarPlantio();
  }, []);

  const plantiosFiltrados = plantio.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (filtro === "" || u.local?.toLowerCase().includes(filtro.toLowerCase()))
  );

  // Função para abrir o modal e selecionar o plantio
  function abrirModal(plantio) {
    setPlantioSelecionado(plantio);
    setModalAberto(true);
  }

  // Função para fechar o modal
  function fecharModal() {
    setModalAberto(false);
    setPlantioSelecionado(null);
  }

  // Função para editar plantio (navegação para outra página)
  function editarPlantio(plantio) {
    navigate(`/editarplantio/${plantio.id_cultivo}`);
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Monitoramento do Plantio</h1>

      {/* Container de pesquisa e filtro */}
      <div className="w-full mt-6 flex flex-col sm:flex-row gap-3 items-center">
        
        {/* Barra de pesquisa */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Pesquisar plantios..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-white border border-lime-300 rounded-xl py-3 pl-12 pr-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700 text-lg">🔍</span>
        </div>

        {/* Filtro */}
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full sm:w-1/2 border border-lime-300 rounded-xl py-3.5 px-3 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
        >
          <option value="">Todos os locais</option>
          <option value="Estufa">Estufa</option>
          <option value="Campo aberto">Campo aberto</option>
        </select>
      </div>

      <p className="text-xl font-medium my-4">Plantios:</p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full">
        {plantiosFiltrados.length > 0 ? (
          plantiosFiltrados.map((p) => (
            <div onClick={() => abrirModal(p)} 
              key={p.id_cultivo}
              className="bg-white rounded-xl shadow-lg border border-lime-100 overflow-hidden hover:shadow-xl hover:border-lime-300 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-32">
                <img
                  src={p.img_cultivo}
                  alt={p.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 text-center">
                <h3 className="text-sm md:text-base font-bold text-lime-800 truncate">{p.nome}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum plantio encontrado.</p>
        )}
      </div>

      {/* MODAL */}
      {modalAberto && plantioSelecionado && (
        <ModalPlantio
          plantioSelecionado={plantioSelecionado}
          fecharModal={fecharModal}
        />
      )}

      {/* Botão Novo */}
      <div className="fixed right-8 top-15">
        {/* Botão para adicionar novo plantio */}
        <Botao type="button" tipo="verde" width="200px" height="40px" onClick={() => navigate("/novoplantio")}>
          + Novo
        </Botao>
      </div>
    </div>
  );
}
