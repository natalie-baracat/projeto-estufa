import React, { useState } from "react";
import { MdArrowDropDown, MdUpload } from "react-icons/md";

export default function EditarPlantio() {
  const [form, setForm] = useState({
    nome: "Morango",
    dataPlantio: "2025-06-12",
    dataColheita: "2025-11-08",
    variedade: "Morango Sabrina",
    area: "1,2 x 1,2 m",
    substrato: "",
    tipoSolo: "",
    adubacao: "NPK 10-10-10 + Esterco curtido",
    irrigacao: "",
    descricao: "",
    estagio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Plantio atualizado com sucesso!");
    console.log("Dados do plantio:", form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Cabeçalho */}
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/05/19/02/strawberries-1238242_1280.jpg"
            alt="Morango"
            className="w-full h-32 object-cover"
          />
          <h1 className="absolute bottom-2 left-4 text-2xl font-bold text-white drop-shadow-lg">
            Editar Plantio
          </h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-sm text-gray-800">
          <div>
            <label className="font-semibold block mb-1">Nome do Plantio</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold block mb-1">Data do Plantio</label>
              <input
                type="date"
                name="dataPlantio"
                value={form.dataPlantio}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Data da Colheita</label>
              <input
                type="date"
                name="dataColheita"
                value={form.dataColheita}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Variedade</label>
            <input
              type="text"
              name="variedade"
              value={form.variedade}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Área de Plantio (acho melhor não ter)</label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold block mb-1">Substrato</label>
              <input
                type="text"
                name="substrato"
                value={form.substrato}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Tipo de solo</label>
              <input
                type="text"
                name="tipoSolo"
                value={form.tipoSolo}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Adubação Utilizada</label>
            <input
              type="text"
              name="adubacao"
              value={form.adubacao}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Sistema de Irrigação (não vai ter)</label>
            <input
              type="text"
              name="irrigacao"
              value={form.irrigacao}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 resize-none"
            ></textarea>
          </div>

          {/* Upload e estágio */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold block mb-1">Imagem do plantio</label>
              <button
                type="button"
                className="w-full border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50"
              >
                <MdUpload size={18} /> Importar
              </button>
            </div>

            <div>
              <label className="font-semibold block mb-1">Estágio atual</label>
              <div className="relative">
                <select
                  name="estagio"
                  value={form.estagio}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-3 py-2 appearance-none outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Selecione</option>
                  <option value="germinacao">Germinação</option>
                  <option value="crescimento">Crescimento</option>
                  <option value="floracao">Floração</option>
                  <option value="colheita">Colheita</option>
                </select>
                <MdArrowDropDown className="absolute right-2 top-2.5 text-gray-600 text-xl pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
