import { useNavigate } from "react-router-dom";

export default function MonitoramentoPlantio() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#f7fdf7] min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Monitoramento do Plantio</h1>

      <p className="text-xl font-medium mb-4">Plantio:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        {/* Card Morango */}
        <div onClick={() => navigate('/PlantioMorango')} className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
          <img
            src="/img/morango.jpg"
            alt="Morango"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-2xl">
            <p className="text-3xl font-bold text-black">Morango</p>
          </div>
        </div>

        {/* Card Milho */}
        <div onClick={() => navigate('/PlantioMilho')} className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
          <img
            src="/img/milho.jpg"
            alt="Milho"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-2xl">
            <p className="text-3xl font-bold text-black">Milho</p>
          </div>
        </div>
      </div>

      {/* Botão Novo */}
      <div className="fixed right-6 top-20">
        <button className="bg-green-300 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full shadow-md">
          + Novo
        </button>
      </div>
    </div>
  );
}
