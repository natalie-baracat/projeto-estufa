import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdFileUpload } from "react-icons/md";

export default function EditarPlantio() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "Morango",
    dataPlantio: "2025-06-12",
    dataColheita: "2025-11-08",
    variedade: "Morango Sabrina",
    substrato: "",
    tipoSolo: "",
    adubacao: "NPK 10-10-10 + Esterco curtido",
    descricao: "",
    estagio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Atualizado:", formData);
    alert("Plantio atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-green-600 transition"
          >
            <MdArrowBack className="text-2xl mr-1" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Editar Plantio</h1>
          <div className="w-16" /> {/* espaçamento simétrico */}
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Nome do Plantio
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Data do Plantio
                </label>
                <input
                  type="date"
                  name="dataPlantio"
                  value={formData.dataPlantio}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Data da Colheita
                </label>
                <input
                  type="date"
                  name="dataColheita"
                  value={formData.dataColheita}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Variedade
            </label>
            <input
              type="text"
              name="variedade"
              value={formData.variedade}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Substrato
              </label>
              <input
                type="text"
                name="substrato"
                value={formData.substrato}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Tipo de solo
              </label>
              <input
                type="text"
                name="tipoSolo"
                value={formData.tipoSolo}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Adubação Utilizada
            </label>
            <input
              type="text"
              name="adubacao"
              value={formData.adubacao}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Imagem do plantio
              </label>
              <button
                type="button"
                className="flex items-center justify-center w-full border rounded-lg p-2 hover:bg-gray-50"
              >
                <MdFileUpload className="text-xl mr-1" />
                Importar
              </button>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Estágio atual
              </label>
              <select
                name="estagio"
                value={formData.estagio}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione</option>
                <option value="Germinação">Germinação</option>
                <option value="Crescimento">Crescimento</option>
                <option value="Floração">Floração</option>
                <option value="Frutificação">Frutificação</option>
              </select>
            </div>
          </div>

          {/* Botão */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-xl transition"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
