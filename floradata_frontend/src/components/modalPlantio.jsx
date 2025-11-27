import React from 'react';
import { MdLocationOn, MdCalendarToday, MdLocalFlorist } from 'react-icons/md';
import Botao from './Botao';

export default function ModalPlantio({ plantioSelecionado, fecharModal }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full sm:w-96 relative">
        {/* Botão fechar */}
        <button
          onClick={fecharModal}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <div className="flex flex-col items-center">
          {/* Header com imagem */}
          <div className="w-full h-48 relative">
            <img
              src={plantioSelecionado.img_cultivo}
              alt={plantioSelecionado.nome}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
            {plantioSelecionado.nome}
          </h2>

          {/* Informações do Plantio */}
          <div className="w-full mt-6 space-y-4">
            {/* Localização */}
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-lime-600" />
              <p className="text-gray-600">{plantioSelecionado.local}</p>
            </div>

            {/* Data de início */}
            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-lime-600" />
              <p className="text-gray-600">Início: {plantioSelecionado.data_inicio}</p>
            </div>

            {/* Espécie */}
            <div className="flex items-center gap-2">
              <MdLocalFlorist className="text-lime-600" />
              <p className="text-gray-600">Espécie: {plantioSelecionado.variedade}</p>
            </div>

            {/* Descrição */}
            <div>
              <h3 className="text-lime-600 font-medium">Descrição:</h3>
              <p className="text-gray-600">{plantioSelecionado.descricao}</p>
            </div>

            {/* Estágio Atual */}
            <div className="flex items-center gap-2">
              <p className="text-gray-600"><strong>Estágio Atual:</strong> {plantioSelecionado.estagio_atual}</p>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-6 w-full flex gap-4">
            <Botao type='button' tipo="verde" width="500px" height="50px" onClick={() => alert('Editando plantio...')}>
              Salvar Plantio
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}
