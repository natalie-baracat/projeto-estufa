import React, { useState } from 'react';
import '../components/Login.css'
import Estilos from '../styles/Estilos';

export default function ControleInteligente() {
  const [irrigacaoOn, setIrrigacaoOn] = useState(true);
  const [iluminacaoOn, setIluminacaoOn] = useState(true);
//   const [irrigacaoLevel, setIrrigacaoLevel] = useState(50);
//   const [lux, setLux] = useState(300);

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="w-full max-w-sm">

        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Controle Inteligente</h1>

          <div className="space-y-6">
            {/* Irrigação */}
            <section className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-medium leading-tight">Irrigação<br/>Automática</h2>
                  <p className="text-sm text-gray-500 mt-1">Inicia: irrigação automática</p>
                </div>

                <div className="flex items-center ml-4">
                  <Toggle checked={irrigacaoOn} onChange={() => setIrrigacaoOn(v => !v)} />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3">
                  {/* <ProgressBar value={irrigacaoLevel} />
                  <div className="text-sm text-gray-600 w-12 text-right">{irrigacaoLevel}%</div> */}
                </div>

              </div>
            </section>

            {/* Iluminação */}
            <section className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-medium leading-tight">Iluminação<br/>Automática</h2>
                </div>

                <div className="flex items-center ml-4">
                  <Toggle checked={iluminacaoOn} onChange={() => setIluminacaoOn(v => !v)} />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3">
                  {/* <ProgressBar value={Math.min(100, Math.round((lux / 1000) * 100))} /> */}
                  {/* <div className="text-sm text-gray-600 w-20 text-right">{lux} lux</div> */}
                </div>

              </div>
            </section>

            <hr className="my-2" />

            <h3 className="text-sm font-semibold">Climatização Automática</h3>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <CardPreview title={"Umidade do\\nsolo"} />
              <CardPreview title="Temperatura" />
            </div>

            <div className="mt-5">
              <button className="w-full bg-lime-600 text-white py-3 rounded-lg shadow-md font-semibold">Salvar Configurações</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none transition-colors ${checked ? 'bg-lime-400' : 'bg-gray-200'}`}>
      <span
        className={`inline-block h-5 w-5 transform bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </button>
  );
}

function ProgressBar({ value = 50 }) {
  return (
    <div className="flex-1">
      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: 'linear-gradient(90deg,#d9f6d6,#a7e8a1)' }} />
      </div>
    </div>
  );
}

function CardPreview({ title }) {
  return (
    <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex flex-col items-start">
      <div className="w-full h-20 rounded-md mb-2 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f7f9f2,#fffbf0)' }}>
        {/* simple decorative wave using svg */}
        <svg viewBox="0 0 200 50" className="w-full h-full">
          <path d="M0 30 C 30 10, 70 50, 100 30 C 130 10, 170 50, 200 30 L200 50 L0 50 Z" fill="#bfecc2" />
        </svg>
      </div>
      <div className="text-sm font-medium text-gray-700 whitespace-pre-line">{title}</div>
    </div>
  );
}
