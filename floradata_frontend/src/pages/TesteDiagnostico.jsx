import React, { useState, useEffect } from 'react';
import { RefreshCw, Thermometer, Droplets, Sun, AlertTriangle, Sprout } from 'lucide-react';
import { 
  onMessage, 
  TOPICO_STATUS, 
  STATUS_BOIA, 
  TOPICO_TEMPERATURA, 
  TOPICO_UMIDADE,
  TOPICO_UMIDADE_SOLO,
  TOPICO_CONDICAO_SOLO,
  TOPICO_COMANDO_BOMBA_AGUA,
  publicar
} from '../../../api/services/temp.js';

export default function TesteDiag() {
  const [lastUpdate, setLastUpdate] = useState('--/--/---- --:--');
  const [status, setStatus] = useState('MORANGO');
  
  const [metrics, setMetrics] = useState({
    temperature: '--',
    humidity: '--',
    soilMoisture: '--',
    soilCondition: '--'
  });

  const [systemStatus, setSystemStatus] = useState({
    boia: 'unknown',
    bombaAgua: 'unknown'
  });

  const [components, setComponents] = useState([
    { name: 'Sensor de Temperatura/Umidade', status: 'inactive', time: '--' },
    { name: 'Sistema de Irrigação', status: 'inactive', time: '--' },
    { name: 'Sensor de Umidade do Solo', status: 'inactive', time: '--' }
  ]);

  const [alerts, setAlerts] = useState([]);

  // Inicializar listeners MQTT
  useEffect(() => {
    // Temperatura
    onMessage(TOPICO_TEMPERATURA, (message) => {
      const temp = parseFloat(message);
      setMetrics(prev => ({ ...prev, temperature: temp.toFixed(1) }));
      updateComponentStatus('Sensor de Temperatura/Umidade', 'active');
      checkTemperatureAlerts(temp);
      updateTimestamp();
    });

    // Umidade do Ar
    onMessage(TOPICO_UMIDADE, (message) => {
      const humidity = parseFloat(message);
      setMetrics(prev => ({ ...prev, humidity: humidity.toFixed(1) }));
      updateComponentStatus('Sensor de Temperatura/Umidade', 'active');
      checkHumidityAlerts(humidity);
      updateTimestamp();
    });

    // Umidade do Solo
    onMessage(TOPICO_UMIDADE_SOLO, (message) => {
      const soilMoisture = parseFloat(message);
      setMetrics(prev => ({ ...prev, soilMoisture: soilMoisture.toFixed(1) }));
      updateComponentStatus('Sensor de Umidade do Solo', 'active');
      checkSoilMoistureAlerts(soilMoisture);
      updateTimestamp();
    });

    // Condição do Solo
    onMessage(TOPICO_CONDICAO_SOLO, (message) => {
      setMetrics(prev => ({ ...prev, soilCondition: message }));
      updateTimestamp();
    });

    // Status da Boia
    onMessage(STATUS_BOIA, (message) => {
      const boiaStatus = message.toLowerCase() === 'cheio' || message === '1' ? 'active' : 'warning';
      setSystemStatus(prev => ({ ...prev, boia: boiaStatus }));
      if (boiaStatus === 'warning') {
        addAlert('warning', 'Nível de água baixo no reservatório');
      } else {
        removeAlert('Nível de água baixo no reservatório');
      }
      updateTimestamp();
    });

    // Status da Bomba d'Água
    onMessage(TOPICO_COMANDO_BOMBA_AGUA, (message) => {
      const bombaStatus = message.toLowerCase() === 'on' || message === '1' ? 'active' : 'inactive';
      setSystemStatus(prev => ({ ...prev, bombaAgua: bombaStatus }));
      updateComponentStatus('Sistema de Irrigação', bombaStatus);
      updateTimestamp();
    });
  }, []);

  const updateTimestamp = () => {
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLastUpdate(formatted);
  };

  const updateComponentStatus = (componentName, status) => {
    const now = new Date();
    const timeFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setComponents(prev => prev.map(comp => 
      comp.name === componentName 
        ? { ...comp, status, time: timeFormatted }
        : comp
    ));
  };

  const checkTemperatureAlerts = (temp) => {
    if (temp > 30) {
      addAlert('error', `Temperatura muito alta: ${temp.toFixed(1)}°C (ideal: 18-25°C)`);
    } else if (temp < 15) {
      addAlert('warning', `Temperatura baixa: ${temp.toFixed(1)}°C (ideal: 18-25°C)`);
    } else {
      removeAlert('Temperatura');
    }
  };

  const checkHumidityAlerts = (humidity) => {
    if (humidity < 60) {
      addAlert('warning', `Umidade do ar baixa: ${humidity.toFixed(1)}% (ideal: 60-80%)`);
    } else if (humidity > 85) {
      addAlert('warning', `Umidade do ar alta: ${humidity.toFixed(1)}% (ideal: 60-80%)`);
    } else {
      removeAlert('Umidade do ar');
    }
  };

  const checkSoilMoistureAlerts = (moisture) => {
    if (moisture < 30) {
      addAlert('error', `Solo muito seco: ${moisture.toFixed(1)}% - Irrigação necessária`);
    } else if (moisture < 50) {
      addAlert('warning', `Umidade do solo baixa: ${moisture.toFixed(1)}%`);
    } else {
      removeAlert('Solo');
    }
  };

  const addAlert = (type, message) => {
    setAlerts(prev => {
      const exists = prev.some(alert => alert.message.includes(message.split(':')[0]));
      if (exists) {
        return prev.map(alert => 
          alert.message.includes(message.split(':')[0]) 
            ? { type, message }
            : alert
        );
      }
      return [...prev, { type, message }];
    });
  };

  const removeAlert = (keyword) => {
    setAlerts(prev => prev.filter(alert => !alert.message.includes(keyword)));
  };

  const handleUpdate = () => {
    // Forçar atualização dos dados
    publicar(TOPICO_STATUS, 'request_update');
    updateTimestamp();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-400';
      case 'inactive': return 'bg-red-500';
      case 'unknown': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Ativo';
      case 'warning': return 'Atenção';
      case 'inactive': return 'Inativo';
      case 'unknown': return 'Desconhecido';
      default: return 'Desconhecido';
    }
  };

  const getOverallStatus = () => {
    const hasError = alerts.some(a => a.type === 'error');
    const hasWarning = alerts.some(a => a.type === 'warning');
    
    if (hasError) return { text: 'ALERTA', color: 'text-red-600', bg: 'bg-red-50' };
    if (hasWarning) return { text: 'ATENÇÃO', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'NORMAL', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const overallStatus = getOverallStatus();

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
              <div className={`flex items-center gap-3 p-4 rounded-xl ${overallStatus.bg}`}>
                <div className={`${getStatusColor(alerts.length > 0 ? 'warning' : 'active')} rounded-full p-2`}>
                  {alerts.length === 0 ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${overallStatus.color}`}>{overallStatus.text}</div>
                  <div className="text-sm text-gray-600">
                    {alerts.length === 0 ? 'Sistema funcionando normalmente' : `${alerts.length} alerta(s) ativo(s)`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-xs text-gray-600 mb-1">Temperatura</div>
                  <div className="text-xl font-bold text-gray-800">
                    {metrics.temperature !== '--' ? `${metrics.temperature}°C` : '--'}
                  </div>
                </div>

                <div className="text-center p-4 bg-cyan-50 rounded-xl">
                  <Droplets className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                  <div className="text-xs text-gray-600 mb-1">Umidade do Ar</div>
                  <div className="text-xl font-bold text-gray-800">
                    {metrics.humidity !== '--' ? `${metrics.humidity}%` : '--'}
                  </div>
                </div>

                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <Sprout className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <div className="text-xs text-gray-600 mb-1">Umidade do Solo</div>
                  <div className="text-xl font-bold text-gray-800">
                    {metrics.soilMoisture !== '--' ? `${metrics.soilMoisture}%` : '--'}
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Sun className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-xs text-gray-600 mb-1">Condição do Solo</div>
                  <div className="text-sm font-bold text-gray-800">
                    {metrics.soilCondition !== '--' ? metrics.soilCondition : '--'}
                  </div>
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
          
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">Nenhum alerta ativo</p>
              <p className="text-sm">Sistema funcionando dentro dos parâmetros normais</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}