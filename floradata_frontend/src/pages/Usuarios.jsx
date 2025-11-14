import React, {useState, useEffect} from "react";
import "../styles/Login.css";
import Estilos from "../styles/Estilos.jsx";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  
  // Carregar usuários da API
  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
      }
    }

    buscarUsuarios();
  }, []);
  


  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (filtro === "" || u.cargo.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div className="min-h-screen  p-4">
    {/* HEADER PADRÃO */}
      <header className="w-full bg-transparent p-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-green-900">
          Usuários
        </h1>
      </header>

      {/* Container de pesquisa e filtro */}
      <div className="w-full mt-6 flex flex-col sm:flex-row gap-3 items-center">

        {/* Barra de pesquisa */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Pesquisar usuários..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-white border border-green-400 rounded-xl py-3 pl-12 pr-4 
                      text-gray-700 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700 text-lg">
            🔍
          </span>
        </div>

        {/* Filtro (está ao lado da barra de pesquisa) */}
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full sm:w-1/2 border border-green-400 rounded-xl py-3.5 px-3
                    bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-green-500
                    focus:outline-none"
        >
          <option value="">Todos os cargos</option>
          <option value="Técnico de Automação">Técnico de Automação</option>
          <option value="Especialista em IOT">Especialista em IOTl</option>
          <option value="Analista de Dados">Analista de Dados</option>
          <option value="Agrônomo">Agrônomo</option>
        </select>

      </div>

      {/* GRID de cards */}
      <div className="w-full mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {usuariosFiltrados.map((user) => (
          <div
            key={user.id_usuario}
            className="bg-white rounded-2xl shadow-md p-5 w-64 h-72 flex flex-col items-center hover:shadow-xl transition">
            {/* Foto circular */}
            <img
              src={user.img_perfil}
              // src={user.img_perfil || "/img/defaultUser.png"} onError={(e) => (e.target.src = "/img/defaultUser.png")}
              alt={`Foto de ${user.nome}`} //mas depois eu vou colocar para aparecer "foto do fulano" 
              className="rounded-full object-cover mb-3 shadow"
              style={{ width:"113px" , height: "113px" }}
            />

            {/* Nome */}
            <p className="text-lg font-semibold text-gray-800 text-center">{user.nome} {user.sobrenome}</p>

            {/* Cargo */}
            <p className="text-sm text-gray-500 mb-4 text-center">{user.cargo}</p>

            {/* abrir hover do perfil do usuario */}
            <button className="text-green-700 font-medium text-sm hover:underline mt-auto">
              Visualizar perfil
            </button>
          </div>
        ))}
      </div>
   </div>
  );
}
