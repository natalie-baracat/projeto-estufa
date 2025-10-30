import React from "react";
import {
  MdOutlineThermostat,
  MdOpacity,
  MdWbSunny,
  MdEdit,
} from "react-icons/md";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

export default function MonitoramentoPlantio() {
  return (
    <div className="w-full  h-full p-4 sm:p-6 overflow-y-auto">
      {/* Card principal — ocupa toda a largura disponível */}
      <div className="w-full bg-white rounded-3xl shadow-md p-6 sm:p-10">
        {/* Status e cabeçalho */}
        <div className="flex flex-wrap justify-between items-center mb-6 border-b pb-2 border-green-100">
          {/* Morango destacado */}
          <span className="text-lime-950 text-4xl font-extrabold ">
            Morango
          </span>

          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-md">
              EM ANDAMENTO
            </span>
            <span className="text-green-800 font-semibold text-sm sm:text-base">
              GERMINAÇÃO
            </span>
          </div>

          <img
            src="https://www.correiobraziliense.com.br/cbradar/wp-content/uploads/2025/02/strawberry_1740072839841-1024x576.jpg"
            alt="Morango"
            className="w-32 sm:w-40 rounded-xl object-cover"
          />
        </div>

        {/* Informações principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm sm:text-base">
          <p>
            <strong>Última verificação:</strong> 12/10/2025 10:55
          </p>
          <p>
            <strong>Planta:</strong> Morango Sabrina
          </p>
          <p>
            <strong>Tipo de canteiro:</strong> Estufa
          </p>
          <p>
            <strong>Data de plantio:</strong> 08/05/2025
          </p>
          <p>
            <strong>Irrigação:</strong> Gotejamento automático
          </p>
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center shadow-sm flex flex-col items-center justify-center">
            <MdOutlineThermostat className="text-red-500 text-2xl" />
            <p className="font-semibold">31,8 °C</p>
            <p className="text-xs text-red-600 flex items-center gap-1">
              <BsFillExclamationTriangleFill /> Temperatura Alta
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-center shadow-sm flex flex-col items-center justify-center">
            <MdOpacity className="text-blue-500 text-2xl" />
            <p className="font-semibold">Umidade 58%</p>
          </div>
        </div>

        {/* Gráfico simulado */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-700">Ações Recentes</h2>
          <div className="mt-2 bg-green-100 rounded-xl h-12 flex items-center justify-center text-green-600 text-xs font-medium">
            (Gráfico de Umidade e pH Simulado)
          </div>
        </div>

        {/* Riscos */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-700">Riscos Detectados</h2>
          <div className="bg-red-100 text-red-700 font-semibold mt-2 px-3 py-2 rounded-lg flex items-center gap-2">
            <BsFillExclamationTriangleFill /> Temperatura Alta
          </div>
        </div>

        {/* Botão */}
        <div className="flex justify-end mt-8">
          <button className="px-6 py-3 bg-green-700 text-white rounded-xl flex items-center gap-2 text-sm sm:text-base font-semibold hover:bg-green-800 transition">
            <MdEdit size={20} onClick={() => navigate('/editarplantio')} /> EDITAR PLANTIO
          </button>
        </div>
      </div>
    </div>
  );
}
