import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const GraficosDash = () => {

  const [dadosSolo, setDadosSolo] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch("http://localhost:3000/umidade-solo-horaria");
        const dados = await resposta.json();

        // Converter para formato aceito pelo Recharts
        const formatado = dados.map((item) => ({
          hora: item.hora.slice(11, 16),      // "HH:MM"
          minimo: item.umidade_min,
          maximo: item.umidade_max
        }));

        setDadosSolo(formatado);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    carregar();
  }, []);

  // -----------------------------
  // Função util para calcular resumo
  // -----------------------------
  const calcResumo = (arr) => {
    if (arr.length === 0) return { media: "-", min: "-", max: "-" };

    const todosValores = arr.flatMap(d => [d.minimo, d.maximo]);

    const media = (todosValores.reduce((a, b) => a + b, 0) / todosValores.length).toFixed(1);
    const min = Math.min(...todosValores);
    const max = Math.max(...todosValores);

    return { media, min, max };
  };

  const resumo = calcResumo(dadosSolo);

  // -----------------------------
  // Componente de Card de Gráfico
  // -----------------------------
  const GraficoCard = ({ titulo, dados }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-3">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          <XAxis dataKey="hora" stroke="#666" />

          <YAxis
            stroke="#666"
            label={{
              value: "Umidade (%)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: "12px" }
            }}
          />

          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="minimo" stroke="#10b981" name="Mínimo" strokeWidth={3} />
          <Line type="monotone" dataKey="maximo" stroke="#ef4444" name="Máximo" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>
          <span className="font-semibold">Média:</span> {resumo.media}
        </div>
        <div>
          <span className="font-semibold">Máxima:</span> {resumo.max}
        </div>
        <div>
          <span className="font-semibold">Mínima:</span> {resumo.min}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <h2 className="font-bold text-gray-800 mb-1">
        Monitoramento - Umidade do Solo (Por Hora)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoCard titulo="Umidade do Solo — Min x Max por Hora" dados={dadosSolo} />
      </div>
    </div>
  );
};

export default GraficosDash;
