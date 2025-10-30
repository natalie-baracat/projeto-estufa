import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficosDash = () => {
  // Dados fictícios dos últimos 7 dias
  const dadosUmidadeAr = [
    { dia: 'Seg', umidade: 65 },
    { dia: 'Ter', umidade: 72 },
    { dia: 'Qua', umidade: 68 },
    { dia: 'Qui', umidade: 75 },
    { dia: 'Sex', umidade: 70 },
    { dia: 'Sáb', umidade: 78 },
    { dia: 'Dom', umidade: 73 }
  ];

  const dadosTemperatura = [
    { dia: 'Seg', temperatura: 24 },
    { dia: 'Ter', temperatura: 26 },
    { dia: 'Qua', temperatura: 25 },
    { dia: 'Qui', temperatura: 27 },
    { dia: 'Sex', temperatura: 28 },
    { dia: 'Sáb', temperatura: 26 },
    { dia: 'Dom', temperatura: 25 }
  ];

  const dadosUmidadeSolo = [
    { dia: 'Seg', umidade: 45 },
    { dia: 'Ter', umidade: 48 },
    { dia: 'Qua', umidade: 52 },
    { dia: 'Qui', umidade: 50 },
    { dia: 'Sex', umidade: 47 },
    { dia: 'Sáb', umidade: 55 },
    { dia: 'Dom', umidade: 53 }
  ];

  const GraficoCard = ({ titulo, dados, dataKey, cor, unidade, media, maxima, minima }) => (
    <div className=" bg-white rounded-lg shadow-md p-6 mt-3">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dados}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="dia" 
            stroke="#666"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#666"
            style={{ fontSize: '12px' }}
            label={{ value: unidade, angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
            formatter={(value) => [`${value}${unidade === 'Temperatura (°C)' ? '°C' : '%'}`, dataKey]}
          />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={cor} 
            strokeWidth={3}
            dot={{ fill: cor, r: 4 }}
            activeDot={{ r: 6 }}
            name={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>
          <span className="font-semibold">Média:</span> {media}
        </div>
        <div>
          <span className="font-semibold">Máxima:</span> {maxima}
        </div>
        <div>
          <span className="font-semibold">Mínima:</span> {minima}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Monitoramento - Últimos 7 Dias
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoCard
          titulo="Umidade do Ar"
          dados={dadosUmidadeAr}
          dataKey="umidade"
          cor="#3b82f6"
          unidade="Umidade (%)"
          media="71.6%"
          maxima="78%"
          minima="65%"
        />

        <GraficoCard
          titulo="Temperatura do Ar"
          dados={dadosTemperatura}
          dataKey="temperatura"
          cor="#ef4444"
          unidade="Temperatura (°C)"
          media="25.9°C"
          maxima="28°C"
          minima="24°C"
        />

        <GraficoCard
          titulo="Umidade do Solo"
          dados={dadosUmidadeSolo}
          dataKey="umidade"
          cor="#10b981"
          unidade="Umidade (%)"
          media="50%"
          maxima="55%"
          minima="45%"
        />
      </div>
    </div>
  );
};

export default GraficosDash;