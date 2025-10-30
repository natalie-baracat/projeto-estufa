import React, {useState, useEffect} from "react";
import "../components/Login.css";
import Estilos from "../styles/Estilos.jsx";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const dados = [
      {
        id: 1,
        nome: "Maria Silva",
        cargo: "Agricultora",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp3o2jUwstkU8OUX_EJ8t1WnODYCyuyxKrEg&s",
      },
      {
        id: 2,
        nome: "João Oliveira",
        cargo: "Produtor Rural",
        foto: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      },
      {
        id: 3,
        nome: "Carlos Santos",
        cargo: "Engenheiro Agrônomo",
        foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
      {
        id: 4,
        nome: "Ana Costa",
        cargo: "Pesquisadora",
        foto: "https://i.pinimg.com/736x/f0/cf/0e/f0cf0e016e02af0f1be10a89c51a04f9.jpg",
      },
    ];
    setUsuarios(dados);
  }, []);

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (filtro === "" || u.cargo.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div className="min-h-screen  p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Usuários</h1>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">Filtrar</option>
          <option value="agricultora">Agricultora</option>
          <option value="produtor">Produtor</option>
          <option value="engenheiro">Engenheiro</option>
        </select>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-green-400 rounded-lg px-3 py-1 w-full max-w-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        {usuariosFiltrados.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-3 text-center w-36 hover:shadow-lg transition"
          >
            <img5
              src={user.foto}
              alt={user.nome}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
            />
            <p className="text-sm font-bold text-gray-800">{user.nome}</p>
            <p className="text-xs text-gray-500 mb-1">{user.cargo}</p>
            <button className="text-red-500 text-xs font-semibold hover:underline">
              Visualizar perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
