import '../components/Login.css'
import Estilos from '../styles/Estilos';

import React, { useState } from 'react';
import { RefreshCw, Thermometer, Droplets, Sun, AlertTriangle } from 'lucide-react';

export default function GreenhouseDiagnostic() {
  const [lastUpdate, setLastUpdate] = useState('12/06/2025 10:58');
  const [status, setStatus] = useState('MORANGO');
  
  const [metrics, setMetrics] = useState({
    temperature: 22,
    humidity: 44,
    luminosity: 350
  });

  const [components, setComponents] = useState([
    { name: 'Sensor', status: 'active', time: '12/06/2025 10:58' },
    { name: 'Ar', status: 'active', time: '12/06/2025 10:58' },
    { name: 'Módulo de Irrigação', status: 'warning', time: '12/06/2025 10:58' },
    { name: 'Módulo de Iluminação', status: 'inactive', time: '12/06/2025 10:58' }
  ]);

  const [alerts, setAlerts] = useState([
    { type: 'error', message: 'Iluminação inativa há mais de 12h' },
    { type: 'warning', message: 'Luminosidade abaixo do ideal: 200 lux' }
  ]);

  const handleUpdate = () => {
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLastUpdate(formatted);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-400';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Ativo';
      case 'warning': return 'Atenção';
      case 'inactive': return 'Inativo';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="text-sm text-gray-600 mb-2 font-medium">DIAGNÓSTICO DO SISTEMA</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Estufa Morango</h1>
          <div className="text-sm text-gray-500 mb-4">
            Última Verificação: {lastUpdate}
          </div>
          <button 
            onClick={handleUpdate}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            ATUALIZAR DIAGNÓSTICO
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status do Sistema */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">STATUS DO SISTEMA</h2>
            <div className="text-2xl font-bold text-gray-700 mb-6">{status}</div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <div className="bg-green-500 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">Normal</div>
                  <div className="text-sm text-gray-600">Positivo</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-xs text-gray-600 mb-1">Temperatura</div>
                  <div className="text-xl font-bold text-gray-800">{metrics.temperature}°C</div>
                </div>

                <div className="text-center p-4 bg-cyan-50 rounded-xl">
                  <Droplets className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                  <div className="text-xs text-gray-600 mb-1">Umidade do Ar</div>
                  <div className="text-xl font-bold text-gray-800">{metrics.humidity}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Componentes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">COMPONENTES</h2>
            
            <div className="space-y-3">
              {components.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(component.status)}`}></div>
                    <div className="font-medium text-gray-700">{component.name}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-600">{getStatusText(component.status)}</span>
                    <span className="text-xs text-gray-400 hidden md:block">{component.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">ALERTAS</h2>
          
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-4 rounded-xl ${
                  alert.type === 'error' ? 'bg-red-50' : 'bg-yellow-50'
                }`}
              >
                <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${
                  alert.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <p className="text-gray-700 font-medium">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}