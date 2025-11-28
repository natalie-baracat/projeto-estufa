import React from 'react'; 
import { 
  MdLocationOn, MdCalendarToday, MdLocalFlorist, MdEdit, MdNaturePeople, MdAccessTime, 
  MdAgriculture, MdTerrain, MdInvertColors, MdLocalFlorist as MdFertilizer 
} from 'react-icons/md';
import Botao from './Botao';

export default function ModalPlantio({ plantioSelecionado, fecharModal }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] h-auto max-h-[75vh] relative">
        {/* Botão fechar */}
        <button
          onClick={fecharModal}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <div className="flex flex-col items-center">
          {/* Header com imagem */}
          <div className="w-full h-40 relative">
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
          <div className="w-full mt-6 space-y-6">
            {/* Layout em Grid para exibir informações lado a lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

              {/* Localização */}
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Área do Cultivo:</strong> {plantioSelecionado.area_plantio}</p>
              </div>

              {/* Data de Início */}
              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Início:</strong> {plantioSelecionado.data_criacao}</p>
              </div>

              {/* Espécie */}
              <div className="flex items-center gap-2">
                <MdLocalFlorist className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Espécie:</strong> {plantioSelecionado.variedade}</p>
              </div>

              {/* Estágio Atual */}
              <div className="flex items-center gap-2">
                <MdNaturePeople className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Estágio Atual:</strong> {plantioSelecionado.estagio_atual}</p>
              </div>

              {/* Tempo de Ciclo */}
              <div className="flex items-center gap-2">
                <MdAccessTime className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Tempo de Ciclo (dias):</strong> {plantioSelecionado.dias_ciclo}</p>
              </div>

              {/* Tipo de Cultivo */}
              <div className="flex items-center gap-2">
                <MdAgriculture className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Tipo de Cultivo:</strong> {plantioSelecionado.tipo_local}</p>
              </div>

              {/* Tipo de Solo */}
              <div className="flex items-center gap-2">
                <MdTerrain className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Tipo de Solo:</strong> {plantioSelecionado.tipo_solo}</p>
              </div>

              {/* Substrato */}
              <div className="flex items-center gap-2">
                <MdInvertColors className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Substrato:</strong> {plantioSelecionado.substrato}</p>
              </div>

              {/* Adubação */}
              <div className="flex items-center gap-2">
                <MdFertilizer className="text-lime-600 text-lg" />
                <p className="text-gray-600"><strong>Adubação:</strong> {plantioSelecionado.adubacao}</p>
              </div>

            </div> {/* Fim do Grid */}

            {/* Descrição */}
            <div className="mt-6 w-full">
              <h3 className="text-lime-600 font-medium"><strong>Descrição</strong></h3>
              <p className="text-gray-600">{plantioSelecionado.descricao}</p>
            </div>
                      {/* Botão */}
            <div className="mt-6 w-full flex justify-center">
              <Botao 
                type="button" tipo="verde" width="100%" height="50px" onClick={() => alert('Editando plantio...')}
                className="flex items-center justify-center gap-2"
              >
                <MdEdit className="text-white text-lg" />
                Editar Plantio
              </Botao>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
